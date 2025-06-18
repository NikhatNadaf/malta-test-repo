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

const UserList = ({ headings, data }) => {
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
            <TableCell className="font-medium">{item?.email}</TableCell>
            <TableCell className="font-medium">{item?.mobile_no}</TableCell>
            <TableCell className="font-medium">
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

export default UserList;
