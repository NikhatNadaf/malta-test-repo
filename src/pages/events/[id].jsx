import { useRouter } from "next/router";
import { useEvents } from "@/features/getEvents";

const EventDetail = () => {
  const router = useRouter();
  const { id } = router.query; // <-- use id, not slug
  const { data: events, isLoading } = useEvents();

  // Compare as strings to avoid type mismatch
  const event = events?.find((e) => String(e.id) === String(id));

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (!event) return <div className="p-8 text-center text-gray-500">Event not found.</div>;

  // Split plain text by double line breaks for paragraphs
  const paragraphs = event.description
    ? event.description.split(/\n\s*\n/).filter(Boolean)
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-white pb-16">
      {/* Back Button */}
      <div className="max-w-3xl mx-auto px-4 pt-8">
        <button
          onClick={() => router.back()}
          className="mb-4 flex items-center gap-2 text-gray-500 hover:text-primary transition"
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth={2}><path d="M15 5l-7 7 7 7"/></svg>
          <span className="font-medium">Back to Blogs</span>
        </button>
      </div>

      {/* Blog Banner */}
      <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg mb-8 relative">
        <div className="relative h-64 w-full">
          <img
            src={event.image || "/placeholder-event.jpg"}
            alt={event.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end">
            <h1 className="text-4xl font-extrabold text-white drop-shadow-lg mb-2">
              {event.title}
            </h1>
            {event.location && (
              <div className="flex items-center gap-2 text-gray-200 text-base mb-1">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="9" cy="9" r="7"/><path d="M9 6v3l2 2"/></svg>
                <span>{event.location}</span>
                {event.date && <span className="mx-2">|</span>}
                {event.date && <span>{event.date}</span>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <article className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-10">
          <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
            {paragraphs.length > 0
              ? paragraphs.map((p, i) => (
                  <p key={i} className="mb-8">{p}</p>
                ))
              : <p>No description available.</p>}
          </div>
        </div>
      </article>
    </div>
  );
};

export default EventDetail;
