import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useCustomForm from "@/hooks/use-custom-form";
import {
  useServicesState,
  useServiceTypeState,
} from "@/context/servicesContext";
import { CommentRatings } from "@/components/ui/rating";
import CPagination from "@/components/ui/CPagniation";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/cui/ServiceCard";
import animationData from "../../public/empty.json";
import { supabase } from "@/supabaseConfig";
import { filtersSchema } from "@/lib/schema";
import { useAuthState } from "@/context/ueAuthContext";
import { getUserLikes } from "@/features/getUserLikes";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};
const SIZE = 6;

function ExploreCategories() {
  const router = useRouter();
  const { query } = router;
  const searchTerm = query.query || "";
  const { date, category, guest } = query;

  const {
    FormCheckbox,
    FormWrapper,
    FormSlider,
    FormInput,
    watch,
    setValue,
    FormCommand,
    register,
  } = useCustomForm({
    schema: filtersSchema,
  });

  const { user } = useAuthState();
  const { services, isLoading } = useServicesState();
  const { serviceType } = useServiceTypeState();

  const [likes, setLikes] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [checkedServiceTypeIds, setCheckedServiceTypeIds] = useState([]);
  const [serviceSubType, setServiceSubType] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Changed to false
  const [sortOrder, setSortOrder] = useState("asc");

  const range = watch("range");
  const min = watch("min");
  const max = watch("max");

  useEffect(() => {
    const fetchLikes = async () => {
      const likesData = await getUserLikes(user?.id);
      setLikes(likesData);
    };
    fetchLikes();
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      if (checkedServiceTypeIds.length > 0) {
        let { data: servicesubtype, error } = await supabase
          .from("servicesubtype")
          .select("*")
          .in("service_id", checkedServiceTypeIds);
        if (error) {
          console.error("Error fetching data:", error);
        } else {
          setServiceSubType(servicesubtype);
        }
      }
    };

    fetchData();
  }, [checkedServiceTypeIds]);

  useEffect(() => {
    if (!range) return;
    setValue("min", range[0]);
    setValue("max", range[1]);
  }, [range]);

  useEffect(() => {
    if (!range) return;
    setValue("range", [min, max]);
  }, [min, max]);

  useEffect(() => {
    if (!category && services.length > 0) {
      setFilteredData(services);
    }
    if (category === "all") {
      setFilteredData(services);
    }
  }, [category, services]);

  useEffect(() => {
    if (searchTerm && services.length > 0) {
      const lowerSearch = searchTerm.toLowerCase();
      const filtered = services.filter((service) =>
        service.name?.toLowerCase().includes(lowerSearch) ||
        service.description?.toLowerCase().includes(lowerSearch) ||
        service.service_type?.toLowerCase().includes(lowerSearch)
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, services]);

  useEffect(() => {
    const fetchFilteredData = async () => {
      try {
        const decodedCategory = decodeURIComponent(category || "").toLowerCase();
        let baseQuery = supabase.from("services").select("*").eq("status", "active");

        if (decodedCategory && decodedCategory !== "all") {
          baseQuery = baseQuery.eq("service_type", decodedCategory);
        }

        let { data: baseData, error: baseError } = await baseQuery;
        if (baseError) {
          console.error("Error fetching base category data:", baseError);
          setFilteredData([]);
          return;
        }

        if (!baseData || baseData.length === 0) {
          setFilteredData([]);
          return;
        }

        let filteredQuery = supabase.from("services").select("*").eq("status", "active");

        if (decodedCategory && decodedCategory !== "all") {
          filteredQuery = filteredQuery.eq("service_type", decodedCategory);
        }

        if (guest) {
          filteredQuery = filteredQuery.gte("maximum_group_size", guest);
        }

        if (date) {
          const localDate = new Date(decodeURIComponent(date));
          localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
          const formattedDate = localDate.toISOString().split("T")[0];
          filteredQuery = filteredQuery.eq("start_date", formattedDate);
        }

        const { data: filteredData, error: filteredError } = await filteredQuery;

        if (filteredError) {
          console.error("Error fetching filtered data:", filteredError);
          setFilteredData(baseData);
          return;
        }

        setFilteredData(filteredData.length > 0 ? filteredData : baseData);
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    if (!searchTerm && services.length > 0) {
      fetchFilteredData();
    }
  }, [category, guest, date, services, searchTerm]);

  useEffect(() => {
    if (!filteredData) return;

    const sorted = [...filteredData].sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      else return b.price - a.price;
    });

    setFilteredData(sorted);
  }, [sortOrder]);

  const currentPage =
    isNaN(parseInt(query.page, 10)) || parseInt(query.page, 10) < 0
      ? 0
      : parseInt(query.page, 10);

  const chunkedData = chunkArray(filteredData, SIZE);

  useEffect(() => {
    if (currentPage >= chunkedData.length) {
      handlePageChange(chunkedData.length - 1);
    }
    // eslint-disable-next-line
  }, [currentPage, chunkedData.length]);

  const handlePageChange = (page) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: page.toString() },
    });
  };

  const handleServiceTypeCheckboxChange = (id, isChecked) => {
    const Id = id?.split(".")[1];
    setCheckedServiceTypeIds((prev) =>
      isChecked ? [...prev, Id] : prev.filter((checkedId) => checkedId !== Id)
    );
  };

  const onSubmit = async (data) => {
    try {
      let baseQuery = supabase.from("services").select("*").eq("status", "active");
      const selectedServiceTypes = Object.keys(data.type || {}).filter((key) => data.type[key] === true);

      if (selectedServiceTypes.length > 0) {
        baseQuery = baseQuery.in("service_type", selectedServiceTypes);
      }

      const { data: baseData, error: baseError } = await baseQuery;
      if (baseError) {
        console.error("Error fetching category-only data:", baseError);
        setFilteredData([]);
        return;
      }

      let fullQuery = supabase.from("services").select("*").eq("status", "active");

      if (selectedServiceTypes.length > 0) {
        fullQuery = fullQuery.in("service_type", selectedServiceTypes);
      }

      if (data.location) {
        fullQuery = fullQuery.eq("location", data.location);
      }

      if (data.min !== undefined && data.max !== undefined) {
        fullQuery = fullQuery.gte("price", data.min).lte("price", data.max);
      }

      const selectedSubTypes = Object.keys(data.sub || {}).filter((key) => data.sub[key] === true);
      if (selectedSubTypes.length > 0) {
        fullQuery = fullQuery.in("service_sub_type", selectedSubTypes);
      }

      const selectedRatings = Object.keys(data.ratings || {}).filter((key) => data.ratings[key] === true);
      if (selectedRatings.length > 0) {
        const { data: reviewData, error: reviewError } = await supabase
          .from("servicecomments")
          .select("service_id")
          .in("rating", selectedRatings);

        if (reviewError) {
          console.error("Error fetching reviews:", reviewError);
          return;
        }

        const serviceIds = reviewData.map((review) => review.service_id);
        if (serviceIds.length > 0) {
          fullQuery = fullQuery.in("id", serviceIds);
        }
      }

      const { data: filteredData, error: filteredError } = await fullQuery;

      if (filteredError) {
        console.error("Error fetching filtered data:", filteredError);
        setFilteredData(baseData);
      } else {
        setFilteredData(filteredData.length > 0 ? filteredData : baseData);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const onError = () => {};

  return (
    <div className="from-primary-foreground to-transparent">
      <main>
        <div className="px-4 py-6 max-w-7xl mx-auto">

          {/* Filter Section */}
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center justify-between">
              <p className="text-lg sm:text-xl font-bold">Filter Your Needs</p>
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen((prev) => !prev)}
                aria-expanded={isFilterOpen}
                aria-controls="filter-bar"
              >
                {isFilterOpen ? "Hide Filters" : "Show Filters"}
              </Button>
            </div>

            {isFilterOpen && (
              <div id="filter-bar" className="border p-3 rounded-lg bg-primary-foreground w-full">
                <FormWrapper
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
                  onSubmit={onSubmit}
                  onError={onError}
                >
                  <div className="flex flex-col gap-1.5">
                    <p className="font-bold text-sm sm:text-base">Select Service</p>
                    {serviceType?.map((cat) => (
                      <FormCheckbox
                        id={`type.${cat.id}`}
                        title={cat?.name}
                        key={cat.id}
                        onCheckboxChange={handleServiceTypeCheckboxChange}
                      />
                    ))}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <p className="font-bold text-sm sm:text-base">Select Type</p>
                    {serviceSubType?.map((subCat) => (
                      <FormCheckbox
                        key={subCat.id}
                        id={`sub.${subCat.id}`}
                        title={subCat.name}
                      />
                    ))}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <p className="font-bold text-sm sm:text-base">Rating Score</p>
                    {[5, 4, 3, 2, 1].map((key) => (
                      <FormCheckbox
                        id={`ratings.${key}`}
                        key={key}
                        title={<CommentRatings rating={key} name="ratings" />}
                      />
                    ))}
                  </div>

                  <div className="flex items-end">
                    <Button
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90 text-white transition-all"
                    >
                      Apply Filter
                    </Button>
                  </div>
                </FormWrapper>
              </div>
            )}
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-2 mb-4">
            <label htmlFor="sortOrder" className="text-sm font-medium">Sort by Price:</label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border px-2 py-1 rounded-md text-sm"
            >
              <option value="asc">Lowest First</option>
              <option value="desc">Highest First</option>
            </select>
          </div>

          {/* Results */}
          {!isLoading && filteredData.length === 0 ? (
            <div className="flex flex-col items-center justify-center my-10">
              <Lottie animationData={animationData} loop autoplay style={{ width: 200, height: 200 }} />
              <p className="text-lg sm:text-xl font-bold text-gray-500">No services found.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {chunkedData[currentPage]?.map((service, index) => (
                  <div key={index} className="transition-transform hover:scale-[1.02] hover:shadow-lg">
                    <ServiceCard
                      index={index}
                      data={service}
                      loading={isLoading}
                      likes={likes}
                    />
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <CPagination
                className="mx-auto"
                size={SIZE}
                data={chunkedData.map((_, idx) => idx)}
                onChange={handlePageChange}
                current={currentPage}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default ExploreCategories;
