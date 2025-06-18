"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {  useState } from "react";
import { CheckCircle } from "lucide-react";


const Cancellation = () => {
  const [cancelModal, setCancelModal] = useState(false);
  return (
    <div>
      <div className="flex items-center gap-3 rounded-lg bg-red-50 p-3 text-sm text-red-700 shadow-sm border border-red-600/50 mt-4" onClick={() => setCancelModal(true)}>
        <CheckCircle className="h-7 w-7 text-red-700" />
        <p>
          <button
            type="button"
            onClick={() => setCancelModal(true)}
            className="font-medium text-red-700 text-sm mb-0"
            aria-label="Show cancellation policy"
          >
            Free cancellation
          </button>{" "}

          up to 24 hours before the experience starts (local time).
        </p>
      </div>

      {/* FULL cancellation modal preserved */}
      {cancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full">
            <h2 className="text-xl font-semibold mb-4">Cancellation Policy - Malta XPlore</h2>
            <div className="flex items-center">
              <div className="w-1/2 text-sm flex items-start justify-start pe-4">Map 29</div>
              <div className="w-2"></div>
              <div className="w-1/2 text-sm flex items-end justify-end pe-4">May 30</div>
            </div>
            <div className="flex items-center my-4">
              <div className="bg-emerald-300 h-7 w-1/2 rounded-s-lg text-center text-sm flex items-center justify-center font-semibold">
                100% refund
              </div>
              <div className="bg-red-300 h-12 w-1 rounded-full"></div>
              <div className="bg-red-300 h-7 w-1/2 rounded-r-full text-center text-sm flex items-center justify-center font-semibold">
                No refund
              </div>
            </div>
            <div className="leading-8 text-gray-700">
              <p>You can cancel up to 24 hours in advance of the experience for a full refund.</p>
              <p>To receive a full refund, your cancellation must be made at least 24 hours before the experience's scheduled start time.</p>
              <p>If you cancel less than 24 hours before the start time, the amount you paid will not be refunded.</p>
              <p>All cut-off times are based on local time in Malta.</p>
            </div>
            <div className="flex justify-end mt-4">
              <Button onClick={() => setCancelModal(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cancellation;
