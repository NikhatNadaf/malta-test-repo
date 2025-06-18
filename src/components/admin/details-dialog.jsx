import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DetailsDialog = ({ users = [] }) => {
  console.log("users", users);
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button className="underline text-muted-foreground">Details</button>
        </DialogTrigger>
        <DialogContent className="p-8" aria-describedby="dialog-description">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Booking Customer Details
            </DialogTitle>
          </DialogHeader>
          {users?.map((user, index) => (
            <Card key={index}>
              <CardContent>
                <div className="flex gap-4 items-center">
                  <Avatar>
                    <AvatarFallback>
                      {user?.user_id?.name
                        ? user?.user_id?.name.charAt(0)
                        : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {user?.user_id?.name}
                    </h3>
                    <p className="text-sm text-gray-600 ">
                      {user?.user_id?.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      {user?.user_id?.mobile_no || "N/A"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <DialogFooter className="mt-6"></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DetailsDialog;
