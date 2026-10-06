import DocumentCard from "./DocumentCard";

const documents = [
  {
    id: 1,
    title: "Project Requirements",
    updatedAt: "Updated 5 minutes ago",
  },
  {
    id: 2,
    title: "Software Engineering Notes",
    updatedAt: "Updated 1 hour ago",
  },
  {
    id: 3,
    title: "Team Meeting Notes",
    updatedAt: "Updated yesterday",
  },
  {
    id: 4,
    title: "Final Year Project",
    updatedAt: "Updated 2 days ago",
  },
];

export default function DocumentList() {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Recent Documents
        </h2>

        <button className="text-sm text-default-500 hover:text-foreground">
          View all
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {documents.map((document) => (
          <DocumentCard
            key={document.id}
            title={document.title}
            updatedAt={document.updatedAt}
          />
        ))}
      </div>
    </section>
  );
}