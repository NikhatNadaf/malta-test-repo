import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DetailsDialog from "./details-dialog";

const BookingList = ({ headings, data }) => {
  console.log(data);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headings.map((h, index) => (
            <TableHead key={index} className="w-[100px]">
              {h}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item, index) => (
          <TableRow>
            <TableCell className="font-medium">
              {item?.service_id?.name}
            </TableCell>
            <TableCell className="font-medium">
              {item?.service_id?.date}
            </TableCell>
            <TableCell className="font-medium">
              {item?.service_id?.location}
            </TableCell>
            <TableCell className="font-medium">
              {item?.created_by?.name}
            </TableCell>
            <TableCell className="font-medium">
              {item?.servicebookingperson?.length}
            </TableCell>
            <TableCell className="font-medium">
              {new Date(item?.created_at).toLocaleDateString()}
            </TableCell>
            <TableCell className="font-medium">
              {item?.pickup_location}
            </TableCell>
            <TableCell className="font-medium text-green-500">
              {item?.payment_status ? "Success" : "Failed"}
            </TableCell>
            <TableCell className="font-medium">
              {item?.payment_intent_id}
            </TableCell>
            <TableCell className="font-medium underline hover:cursor-pointer w-12">
              <DetailsDialog users={item?.servicebookingperson} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BookingList;
