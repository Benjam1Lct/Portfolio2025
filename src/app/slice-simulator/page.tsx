"use client"

import { useEffect, useState } from "react";
import { SliceSimulator, getSlices } from "@slicemachine/adapter-next/simulator";
import { SliceZone } from "@prismicio/react";

import { components } from "../../slices";

export default function SliceSimulatorPage() {
  const [slices, setSlices] = useState<any[]>([]);

  useEffect(() => {
    // Read the `state` param from the URL at runtime (client-side)
    const params = new URLSearchParams(window.location.search);
    const state = params.get("state") || "";
    try {
      const resolved = getSlices(state);
      setSlices(resolved || []);
    } catch (e) {
      // If parsing fails, show empty simulator
      setSlices([]);
      console.warn("Failed to parse slice simulator state:", e);
    }
  }, []);

  return (
    <SliceSimulator
      background="#121b2f"
      // When used in a Client Component, the simulator expects a `sliceZone` prop
      // which is a component that will receive the slices at runtime.
      sliceZone={(props) => <SliceZone {...props} components={components} />}
      >
    </SliceSimulator>
  );
}
