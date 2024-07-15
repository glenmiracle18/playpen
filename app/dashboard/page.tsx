"use client";

import { useTransition } from "react";
import { useState } from "react";
import Uploader from "./_components/uploader";

const DashboardPage = () => {
  return (
    <div className="">
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Uploader />
      </main>
    </div>
  );
};

export default DashboardPage;
