
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/Pages/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Pages/ui/form";
import { Input } from "@/Pages/ui/input";
import { Textarea } from "@/Pages/ui/textarea";

// Schema for form validation
const parkingLotSchema = z.object({
  id: z.string().optional(),
  lat: z.coerce.number().optional(),
  lng: z.coerce.number().optional(),
  levels: z.coerce.number().int().positive("Must have at least 1 level"),
  hasElevator: z.boolean().optional(),
  hourlyRate: z.coerce.number().positive("Hourly rate must be positive"),
  dailyRate: z.coerce.number().positive("Daily rate must be positive"),
  availableSpots: z.coerce.number().int().positive("Must have at least 1 spot"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  address: z.string().min(5, "Please enter a valid address"),
  totalSpots: z.coerce.number().int().positive("Must have at least 1 spot"),
});

type ParkingLotFormData = z.infer<typeof parkingLotSchema>;

interface ParkingLotFormProps {
  onSubmit: (data: ParkingLotFormData) => void;
  onCancel: () => void;
}

export const ParkingLotForm = ({ onSubmit, onCancel }: ParkingLotFormProps) => {
  const form = useForm<ParkingLotFormData>({
    resolver: zodResolver(parkingLotSchema),
    defaultValues: {
      id: "",
      name: "",
      address: "",
      lat: 0.0,
      lng: 0.0,
      totalSpots: 0,
      availableSpots: 0,
      levels: 0,
      hasElevator: false,
      hourlyRate: 0,
      dailyRate: 0
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>id</FormLabel>
              <FormControl>
                <Input placeholder="lot-x" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Downtown Parking" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea placeholder="123 Main Street, New York, NY 10001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="totalSpots"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Spots</FormLabel>
                <FormControl>
                  <Input placeholder="100" type="number" min="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Latitude</FormLabel>
                <FormControl>
                  <Input placeholder="40.7128" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lng"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Longitude</FormLabel>
                <FormControl>
                  <Input placeholder="-74.0060" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="levels"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Levels</FormLabel>
                <FormControl>
                  <Input placeholder="3" type="number" min="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hasElevator"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Has Elevator</FormLabel>
                <FormControl>
                  <Input type="checkbox" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hourlyRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hourly Rate</FormLabel>
                <FormControl>
                  <Input placeholder="5" type="number" min="0.01" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dailyRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Daily Rate</FormLabel>
                <FormControl>
                  <Input placeholder="20" type="number" min="0.01" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="availableSpots"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Available Spots</FormLabel>
                <FormControl>
                  <Input placeholder="50" type="number" min="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /></div>
        
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            Save Parking Lot
          </Button>
        </div>
      </form>
    </Form>
  );
};
