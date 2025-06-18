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

const WebReviewsList = ({ headings, data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headings.slice(1).map((h, index) => (
            <TableHead key={index} className="w-[100px]">
              {h}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item, index) => (
          <TableRow>
         
            <TableCell className="font-medium">{item?.users?.name}</TableCell>
            <TableCell className="font-medium w-[340px]">{item?.description}</TableCell>
            <TableCell className="font-medium">{item?.rating} Star</TableCell>
            <TableCell className="font-medium">{item?.location}</TableCell>
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

export default WebReviewsList;
