'use client';

import { useEffect, useState } from 'react';

export default function Spinner() {
  
  return (
    <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#910f3f]"></div>
    </div>
  );
}
