import { DataTable } from "@/components/ui/DataTable";
import AddTourTypesModal from "@/modules/admin/tour/AddTourTypesModal";
import { useGetAllTourTypeQuery } from "@/redux/features/tour/tour.api";
import { Delete, SquarePen } from "lucide-react";

function AddTourType() {
  const { data: allTourTypes, isLoading: tourLoading } = useGetAllTourTypeQuery();
  const itemsPerPage = 5;
  const tourTypes = allTourTypes?.data || [];

  const columns = [
    {
      header: "SN",
      accessor: (_row: unknown, idx: number) => idx + 1,
      className: "w-[100px] font-medium",
    },
    {
      header: "Name",
      accessor: (row: unknown) => (row as { name: string }).name,
    },
    {
      header: "Action",
      accessor: () => (
        <div className="text-right space-x-4">
          <button className="cursor-pointer">
            <SquarePen className="inline-block " />
          </button>
          <button className="text-red-500 hover:underline cursor-pointer">
            <Delete size={25} className="inline-block " />
          </button>
        </div>
      ),
      className: "text-right",
    },
  ];

  return (
    <div>
      <div className="flex justify-end mb-4 ">
        <AddTourTypesModal />
      </div>
      <DataTable
        columns={columns}
        data={tourTypes}
        isLoading={tourLoading}
        itemsPerPage={itemsPerPage}
        caption="A list of available tour types."
      />
    </div>
  );
}

export default AddTourType;
