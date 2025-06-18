import { useQueryClient } from "@tanstack/react-query";
export const dbNames = {
  supplieraccess: "supplieraccess",
  suppliercompany: "suppliercompany",
  servicetype: "servicetype",
  servicesubtype: "servicesubtype",
};
function useFetchData() {
  const queryClient = useQueryClient();
  const {
    data: { user },
  } = queryClient.getQueryData["user"] ?? {
    data: { user: null },
  };

  const { data: userInfo } = queryClient.getQueryData[
    (dbNames.supplieraccess, "auth_id", user?.id ?? "")
  ] ?? {
    data: { data: null },
  };
  const { data: companyInfo } = queryClient.getQueryData[
    (dbNames.suppliercompany, "id", userInfo?.[0]?.supplier_company_id)
  ] ?? {
    data: { data: null },
  };

  const getData = (dbName, key, id) =>
    queryClient.getQueryData[(dbName, key, id)] ?? {
      data: [],
      error: null,
    };
  const getAllData = (dbName) =>
    queryClient.getQueryData[dbName] ?? {
      data: [],
      error: null,
    };

  const refect = (keys = []) => {
    queryClient.invalidateQueries({ queryKey: keys });
  };

  return {
    userInfo: userInfo[0] ?? {},
    companyInfo: companyInfo[0] ?? {},
    getData,
    getAllData,
    refect,
  };
}

export default useFetchData;
