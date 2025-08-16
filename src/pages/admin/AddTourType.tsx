import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { DataTable } from "@/components/ui/DataTable";
import AddTourTypesModal from "@/modules/admin/tour/AddTourTypesModal";
import { useDeleteTourTypeByIdMutation, useGetAllTourTypeQuery } from "@/redux/features/tour/tour.api";
import type { ITourTypeResponse } from "@/types";
import { Delete, SquarePen } from "lucide-react";
import { toast } from "sonner";

function AddTourType() {
  const { data: allTourTypes, isLoading: tourLoading } = useGetAllTourTypeQuery();
  const itemsPerPage = 5;
  const tourTypes = allTourTypes?.data || [];
  const [deleteFn] = useDeleteTourTypeByIdMutation();

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteFn(id).unwrap();
      if (res.success) {
        toast.success("Tour type deleted successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete tour type");
    }
  };

  const columns = [
    {
      header: "SN",
      accessor: (_row: ITourTypeResponse, idx: number) => idx + 1,
      className: "w-[100px] font-medium",
    },
    {
      header: "Name",
      accessor: (row: ITourTypeResponse) => row.name,
    },
    {
      header: "Action",
      accessor: (row: ITourTypeResponse) => (
        <div className="text-right space-x-4">
          <button className="cursor-pointer">
            <SquarePen className="inline-block " />
          </button>
          <DeleteConfirmation onConfirm={() => handleDelete(row._id)}>
            <button className="text-red-500 hover:underline cursor-pointer">
              <Delete size={25} className="inline-block " />
            </button>
          </DeleteConfirmation>
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
