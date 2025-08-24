import React, { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronDown, ChevronLeft, ChevronRight, X, Calendar as CalendarIcon } from "lucide-react";
import { Dialog, DialogBody, DialogContent } from "@/components/core";
import SchoolBookingInfo from "./SchoolBookingInfo";
import SchoolDriverContact from "./SchoolDriverContact";
import SelectField from "@/components/core/SelectField";
import SchoolParticipantForm from "./SchoolParticipant";
import { useFetchDiveSchools } from "@/app/(main)/(dashboard)/api/bookings/fetchDivingSchools";
import { useFetchDiveSites } from "@/app/(main)/(dashboard)/api/bookings/fetchDiveLocations";
import { useFetchDiveInstructors } from "@/app/(main)/(dashboard)/api/bookings/fetchDiveInstructors";
import { useFetchDiveEvent } from "@/app/(main)/(dashboard)/api/bookings/fetchDiveEvent";

// Validation schema
const createDivePlanSchema = z.object({
  dive_level: z.string().min(1, "Please select a dive level"),
  location: z.string().min(1, "Please select a dive location"),
  diveSchool: z.string().min(1, "Please select a dive school"),
  diveClass: z.string().min(1, "Please select a dive class"),
  event_date_id: z.string().min(1, "Please select a dive event date"),
  dive_event_id: z.string().min(1, "Please select a dive event id"),
  instructor_id: z.string().min(1, "Please select a dive Instrctor"),
  date: z.date({ required_error: "Please select a date" }),
});

type CreateDivePlanFormData = z.infer<typeof createDivePlanSchema>;

interface Props {
  isOpen: boolean;
  setIsOpenCardModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Calendar = ({
  onDateSelect,
  selectedDate,
}: {
  onDateSelect: (date: Date) => void;
  selectedDate: Date | null;
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 5)); // June 2024

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = ["Mo", "Tu", "We", "Th", "Fr", "Sat", "Su"];

  const days = [];

  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const prevMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      0
    );
    days.push({ date: prevMonth.getDate() - i, isCurrentMonth: false });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    const isSelected =
      selectedDate &&
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth();
    days.push({ date: day, isCurrentMonth: true, fullDate: date, isSelected });
  }

  const remainingDays = 42 - days.length;
  for (let day = 1; day <= remainingDays; day++) {
    days.push({ date: day, isCurrentMonth: false });
  }

  return (
    <div className="bg-transparent w-full">
      <div className="flex justify-between items-center w-full mb-4">
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
            )
          }
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
        <div className="font-semibold text-gray-900 dark:text-white">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
            )
          }
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2 w-full">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 w-full">
        {days.map((day, index) => {
          const isToday = day.isCurrentMonth && day.date === 6;
          const hasEvent =
            day.isCurrentMonth && (day.date === 11 || day.date === 24);

          return (
            <button
              key={index}
              onClick={() =>
                day.isCurrentMonth && day.fullDate && onDateSelect(day.fullDate)
              }
              className={`
                relative p-2 h-10 text-sm rounded transition-colors
                ${day.isCurrentMonth ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-600"}
                ${day.isSelected ? "bg-blue-500 text-white" : ""}
                ${isToday ? "bg-orange-500 text-white" : ""}
                hover:bg-gray-100 dark:hover:bg-gray-700
              `}
            >
              {day.date}
              {hasEvent && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Date Input Component with Popup
const DateInput = ({
  selectedDate,
  onDateSelect,
}: {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Format date for display
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    onDateSelect(date);
    setIsCalendarOpen(false);
  };

  // Close calendar on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsCalendarOpen(false);
      }
    };

    if (isCalendarOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isCalendarOpen]);

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setIsCalendarOpen(true)}
        className="w-full px-4 py-3 text-left border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors flex items-center justify-between"
      >
        <span className={selectedDate ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}>
          {selectedDate ? formatDate(selectedDate) : "Select a date"}
        </span>
        <CalendarIcon className="h-5 w-5 text-gray-400" />
      </button>
      
      {/* Calendar Popup Modal */}
      {isCalendarOpen && (
        <div className="fixed w-full inset-0 z-[9999] flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setIsCalendarOpen(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative z-10 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-600 max-w-sm mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Select Date
              </h3>
              <button
                onClick={() => setIsCalendarOpen(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            
            {/* Calendar */}
            <div className="p-4 w-full">
              <Calendar
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}

              />
            </div>
            
            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-600">
              <button
                onClick={() => setIsCalendarOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              {selectedDate && (
                <button
                  onClick={() => setIsCalendarOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Confirm
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CreateSchoolPlan = ({ isOpen, setIsOpenCardModal }: Props) => {
  const [activeStep, setActiveStep] = useState<
    "create" | "book" | "stage1" | "stage2"
  >("create");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const createForm = useForm<CreateDivePlanFormData>({
    resolver: zodResolver(createDivePlanSchema),
    defaultValues: {
      dive_level: "",
      location: "",
      diveSchool: "",
      diveClass: "",
      dive_event_id:"",
      instructor_id:"",
      event_date_id:""
    },
  });

  const onCreateSubmit = (data: CreateDivePlanFormData) => {
    console.log("Form submitted:", data);
    setActiveStep("book");
  };

  const diveLevels = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ];

  const diveClasses = [
    { value: "discover-scuba", label: "Discover Scuba Dive Exp. (US $95.00)" },
    { value: "open-water", label: "Open Water (US $350.00)" },
  ];
  const watchSchool = createForm?.watch("diveSchool")

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useFetchDiveSchools();
  const {
    data: diveSitesData,
    fetchNextPage: fetchNextPageDiveSites,
    hasNextPage: hasNextPageDiveSite,
    isLoading: isLoadingDiveSites,
    isFetchingNextPage: isFetchingNextPageDiveSite,
  } = useFetchDiveSites();
  const {
    data: diveEventData,
    fetchNextPage: fetchNextPageDiveEvent,
    hasNextPage: hasNextPageDiveEvent,
    isLoading: isLoadingDiveEvent,
    isFetchingNextPage: isFetchingNextPageDiveEvent,
  } = useFetchDiveEvent(watchSchool);

  // Flatten pages into one array
  const diveSchools =
    data?.pages.flatMap((page) =>
      page.results.map((school) => ({
        label: school.name,
        value: String(school.id),
      }))
    ) ?? [];
  const diveLocation =
    diveSitesData?.pages.flatMap((page) =>
      page.data?.results.map((site) => ({
        label: site?.title,
        value: String(site?.id),
      }))
    ) ?? [];
 const diveEvent =
  diveEventData?.pages.flatMap((page) =>
    page.data?.results.flatMap((event) =>
      event.event_dates.map((date) => ({
        id: event.id,
        label: date.event_date,
        value: String(date.id),
      }))
    )
  ) ?? [];


  const getDiveInstructorsBySchool = (schoolId: number) => {
    const school = data?.pages
      .flatMap((page) => page.results)
      .find((site) => site.id === schoolId);

    return school?.dive_instructors?.map((instruct) => ({
      label: instruct.full_name,
      value: String(instruct.dive_instructor_id),
    })) ?? [];
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 && // near bottom
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 && // near bottom
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPageDiveSite, isFetchingNextPageDiveSite, fetchNextPageDiveSites]);
  
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 && // near bottom
        hasNextPageDiveEvent &&
        !isFetchingNextPageDiveEvent
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPageDiveEvent, isFetchingNextPageDiveEvent, fetchNextPageDiveEvent]);


  const watchEventDateId = createForm.watch("event_date_id");

useEffect(() => {
  if (watchEventDateId) {
    const selectedEvent = diveEventData?.pages
      .flatMap(page => page.data?.results || [])
      .find(event => 
        event.event_dates.some(date => String(date.id) === watchEventDateId)
      );
    
    if (selectedEvent) {
      createForm.setValue("dive_event_id", String(selectedEvent?.id));
    }
  }
}, [watchEventDateId, diveEventData, createForm]);
  if (!isOpen) return null;

  return (
    <Dialog modal={true} open={isOpen}>
      <DialogContent className="!max-w-[917px] !max-h-[90vh] bg-white dark:bg-gray-900">
        <DialogBody className="w-full max-md:px-2 outline-none text-gray-900 dark:text-white">
          {activeStep === "create" && (
            <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700">
              <h1 className="text-2xl font-bold">Create a Dive Plan</h1>
            </div>
          )}
          {activeStep === "book" && (
            <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700">
              <h1 className="text-2xl font-bold">Book a Dive Plan</h1>
            </div>
          )}
          {activeStep !== "book" && activeStep !== "create" && (
            <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700">
              <h1 className="text-2xl font-bold">Complete your Booking</h1>
            </div>
          )}
          <div className="p-3">
            {activeStep === "create" && (
              <div className="">
                <div className="space-y-6 px-3 overflow-y-auto max-h-[calc(88vh-160px)]">
                  {/* Dive Level */}
                  <Controller
                    name="dive_level"
                    control={createForm.control}
                    render={({ field }) => (
                      <SelectField
                        field={field}
                        label="Choose your Dive Level"
                        placeholder="Beginner"
                        options={diveLevels}
                          error={createForm?.formState?.errors?.dive_level}
                      />
                    )}
                  />
                  {createForm.formState.errors.dive_level && (
                    <p className="text-red-500 text-sm">
                      {createForm.formState.errors.dive_level.message}
                    </p>
                  )}

                  {/* Location */}
                  <Controller
                    name="location"
                    control={createForm.control}
                    render={({ field }) => (
                      <SelectField
                        field={field}
                        label="Select Dive Location"
                        placeholder="Eden Beach"
                        options={diveLocation}
                        onReachEnd={() => {
                          if (
                            hasNextPageDiveSite &&
                            !isFetchingNextPageDiveSite
                          ) {
                            fetchNextPageDiveSites();
                          }
                        }}
                        loading={
                          isFetchingNextPageDiveSite || isLoadingDiveSites
                        }
                          error={createForm?.formState?.errors?.location}

                      />
                    )}
                  />
                  {createForm.formState.errors.location && (
                    <p className="text-red-500 text-sm">
                      {createForm.formState.errors.location.message}
                    </p>
                  )}

                  {/* Dive School */}
                  <Controller
                    name="diveSchool"
                    control={createForm.control}
                    render={({ field }) => (
                      <SelectField
                        field={field}
                        label="Select Dive School"
                        placeholder="WannaDive"
                        options={diveSchools}
                        onReachEnd={() => {
                          if (hasNextPage && !isFetchingNextPage) {
                            fetchNextPage();
                          }
                        }}
                        loading={isFetchingNextPage || isLoading}
                             error={createForm?.formState?.errors?.diveSchool}

                      />
                    )}
                  />

                  {createForm.formState.errors.diveSchool && (
                    <p className="text-red-500 text-sm">
                      {createForm.formState.errors.diveSchool.message}
                    </p>
                  )}

                  {/* Dive Class */}
                  <Controller
                    name="diveClass"
                    control={createForm.control}
                    render={({ field }) => (
                      <SelectField
                        field={field}
                        label="Select Dive Classes"
                        placeholder="Discover Scuba Dive Exp. (US $95.00)"
                        options={diveClasses}
                        error={createForm?.formState?.errors?.diveClass}
                      />
                    )}
                  />
                  {createForm.formState.errors.diveClass && (
                    <p className="text-red-500 text-sm">
                      {createForm.formState.errors.diveClass.message}
                    </p>
                  )}
                  <Controller
                    name="event_date_id"
                    control={createForm.control}
                    render={({ field }) => (
                      <SelectField
                        field={field}
                        label="Select Dive event"
                        placeholder=""
                        options={diveEvent}
                        loading={isFetchingNextPage || isLoadingDiveEvent}
                        error={createForm?.formState?.errors?.event_date_id}
                      />
                    )}
                  />
                  {createForm.formState.errors.diveClass && (
                    <p className="text-red-500 text-sm">
                      {createForm.formState.errors.diveClass.message}
                    </p>
                  )}
                  
                  {watchSchool && (
                    <div className="">
                      <Controller
                        name="instructor_id"
                        control={createForm.control}
                        render={({ field }) => (
                          <SelectField
                            field={field}
                            label="Select Dive instructors"
                            placeholder="Dive instructors"
                            options={getDiveInstructorsBySchool(Number(watchSchool))}
                            loading={isFetchingNextPage || isLoading}
                             error={createForm?.formState?.errors?.instructor_id}
                          />
                        )}
                      />
                      {createForm.formState.errors.instructor_id && (
                        <p className="text-red-500 text-sm">
                          {createForm.formState.errors.instructor_id.message}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Date Picker - Now as Input Field */}
                 <div className="space-y-2 grid items-center grid-cols-1 md:grid-cols-[1fr_2fr]">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Choose a date
                    </label>
                    <Controller
                      name="date"
                      control={createForm.control}
                      
                      render={({ field }) => (
                        <DateInput
                        
                          selectedDate={selectedDate}
                          onDateSelect={(date) => {
                            setSelectedDate(date);
                            field.onChange(date);
                          }}
                        />
                      )}
                    />
                  </div>
                  {createForm.formState.errors.date && (
                    <p className="text-red-500 text-sm">
                      {createForm.formState.errors.date.message}
                    </p>
                  )}
                </div>
                {/* Hidden field - no Controller needed with useEffect approach */}
<input type="hidden" {...createForm.register("dive_event_id")} />
                
                <div className="flex justify-end gap-4 border-gray-200 dark:border-gray-700 px-6 pt-4 bg-white dark:bg-gray-900">
                  <button
                    type="button"
                    onClick={() => setIsOpenCardModal(false)}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={createForm.handleSubmit(onCreateSubmit)}
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                  >
                    Proceed
                  </button>
                </div>
              </div>
            )}

            {activeStep === "book" && (
              <SchoolBookingInfo
                back={() => setActiveStep("create")}
                next={() => setActiveStep("stage1")}
              />
            )}
            {activeStep === "stage1" && (
              <SchoolDriverContact
                back={() => setActiveStep("book")}
                next={() => setActiveStep("stage2")}
              />
            )}
            {activeStep === "stage2" && (
              <SchoolParticipantForm
                back={() => setActiveStep("stage1")}
                next={() => setActiveStep("stage2")}
              />
            )}
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSchoolPlan;