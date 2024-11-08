import { generateContent } from "@/components/alerts";
import { columns } from "@/components/console/columns";
import { ConsoleTable } from "@/components/console/console";

export default function ServicePage({ params }: { params: { id: string } }) {
  const id = params.id;

  // 100 contents
  const data = Array.from({ length: 100 }, generateContent);

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <h1 className="text-2xl font-bold">{id}</h1>
      <div className="overflow-auto flex-grow min-h-0">
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-expect-error */}
        <ConsoleTable data={data} columns={columns} />
      </div>
    </div>
  );
}
