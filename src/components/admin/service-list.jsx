import React from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";

const ServiceList = ({ headings, data }) => {
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
            <TableCell className="font-medium">{item?.name}</TableCell>
            <TableCell className="font-medium">{item?.date}</TableCell>
            <TableCell className="font-medium">{item?.price}</TableCell>
            <TableCell>{item?.location}</TableCell>
            {/* <TableCell>{item?.service_type_name}</TableCell> */}
            {/* <TableCell>{item?.service_sub_type_name}</TableCell> */}
            <TableCell>{item?.duration?.join(" - ") + " min"}</TableCell>
            <TableCell>{item?.maximum_group_size}</TableCell>
            {/* <TableCell>{item?.cancellation_policy}</TableCell> */}
            <TableCell>{item?.supplier_name}</TableCell>
            <TableCell>{item?.status}</TableCell>
            <TableCell>
              {new Date(item?.created_at).toLocaleDateString()}
            </TableCell>
            <TableCell className="font-medium w-12">
              <Trash2 size={16} color="#ff0505" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ServiceList;
