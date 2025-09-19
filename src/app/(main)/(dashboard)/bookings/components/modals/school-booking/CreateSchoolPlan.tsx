import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogBody, DialogContent } from "@/components/core";
import SchoolBookingInfo from "./SchoolBookingInfo";
import SchoolDriverContact, { BookingDriverFormValues } from "./SchoolDriverContact";
import SelectField from "@/components/core/SelectField";
import SchoolParticipantForm from "./SchoolParticipant";
import { useFetchDiveSchools } from "@/app/(main)/(dashboard)/api/bookings/fetchDivingSchools";
import { useFetchDiveSites } from "@/app/(main)/(dashboard)/api/bookings/fetchDiveLocations";
import { useFetchDiveEvent } from "@/app/(main)/(dashboard)/api/bookings/fetchDiveEvent";
import moment from "moment";
import { SmallSpinner } from "@/icons/core";

// Validation schema
const createDivePlanSchema = z.object({
  dive_level: z.string().min(1, "Please select a dive level"),
  location: z.string().min(1, "Please select a dive location"),
  instructor_id: z.string().min(1, "Please select a dive Instrctor"),
  event_date_id: z.string().min(1, "Please select a dive event date"),
  dive_event_id: z.string().min(1, "Please select a dive event id"),
  div_school: z.string().min(1, "Please select a dive school"),
  // div_class: z.string().min(1, "Please select a dive class"),
});

export type CreateDivePlanFormData = z.infer<typeof createDivePlanSchema>;

interface Props {
  isOpen: boolean;
  setIsOpenCardModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateSchoolPlan = ({ isOpen, setIsOpenCardModal }: Props) => {
  const [activeStep, setActiveStep] = useState<
    "create" | "book" | "stage1" | "stage2"
  >("create");

  const [schoolBookingDataInfo, setSchoolBookingDataInfo] = useState<CreateDivePlanFormData>({
    // div_class:"",
    div_school:"",
    dive_event_id:"",
    dive_level:"",
    event_date_id:"",
    instructor_id:"",
    location:""
  })
  const [diverInfo, setDiverInfo] = useState<BookingDriverFormValues>({email:"",first_name:"",last_name:""})
  const createForm = useForm<CreateDivePlanFormData>({
    resolver: zodResolver(createDivePlanSchema),
    defaultValues: {
    //  div_class:schoolBookingDataInfo?.div_class ||"",
    div_school:schoolBookingDataInfo?.div_school ||"",
    dive_event_id:schoolBookingDataInfo?.dive_event_id ||"",
    dive_level:schoolBookingDataInfo?.dive_level ||"",
    event_date_id:schoolBookingDataInfo?.event_date_id ||"",
    instructor_id:schoolBookingDataInfo?.instructor_id ||"",
    location:schoolBookingDataInfo?.location ||""
    },
  });

  const onCreateSubmit = (data: CreateDivePlanFormData) => {
    console.log("Form submitted:", data);
    setSchoolBookingDataInfo({
    // div_class:data?.div_class,
    div_school:data?.div_school,
    dive_event_id:data?.dive_event_id,
    dive_level:data?.dive_level,
    event_date_id:data?.event_date_id,
    instructor_id:data?.instructor_id,
    location:data?.location
    })
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
  const watchSchool = createForm?.watch("div_school")
  const watchEventDateId = createForm.watch("dive_event_id");
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


  const diveDateId =
    diveEventData?.pages.flatMap((page) =>
      page.data?.results.map((event) => ({
        label: event?.name,
        value: String(event?.id),
      }))
    ) ?? [];

  const diveEvent =
    diveEventData?.pages.flatMap((page) =>
      page.data?.results
        .filter((event) => String(event?.id) === String(watchEventDateId))
        .flatMap((event) =>
          event?.event_dates?.map((date) => ({
            value:String( date?.id),
            label: moment(date?.event_date)?.format("lll")
          })) ?? []
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
        hasNextPageDiveSite &&
        !isFetchingNextPageDiveSite
      ) {
        fetchNextPageDiveSites();
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




  if (!isOpen) return null;

  return (
    <Dialog modal={true} open={isOpen}>
      <DialogContent className="!max-w-[917px] !max-h-[95vh] bg-white dark:bg-gray-900">
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
                    name="div_school"
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
                        error={createForm?.formState?.errors?.div_school}

                      />
                    )}
                  />

                  {createForm.formState.errors.div_school && (
                    <p className="text-red-500 text-sm">
                      {createForm.formState.errors.div_school.message}
                    </p>
                  )}

                 

                  <Controller
                    name="dive_event_id"
                    control={createForm.control}
                    render={({ field }) => (
                      <SelectField
                        field={field}
                        label="Select Dive event"
                        placeholder=""
                        options={diveDateId} // Uses the transformed data above
                        loading={isFetchingNextPageDiveEvent || isLoadingDiveEvent}
                        error={createForm?.formState?.errors?.dive_event_id}
                      />
                    )}
                  />

                  {watchEventDateId && <Controller
                    name="event_date_id"
                    control={createForm.control}
                    render={({ field }) => (
                      <SelectField
                        field={field}
                        label="Select Dive event"
                        placeholder=""
                        options={diveEvent} // Uses the transformed data above
                        loading={isFetchingNextPageDiveEvent || isLoadingDiveEvent}
                        error={createForm?.formState?.errors?.event_date_id}
                      />
                    )}
                  />}
                  {createForm.formState.errors.event_date_id && (
                    <p className="text-red-500 text-sm">
                      {createForm.formState.errors.event_date_id.message}
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

                </div>


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
                    className="px-6 py-2 bg-orange-500 text-white flex justify-center items-center gap-x-3 rounded-lg hover:bg-orange-600"
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
                setDiverInfo={setDiverInfo}
                diverInfo={diverInfo}
              />
            )}
            {activeStep === "stage2" && (
              <SchoolParticipantForm
                back={() => setActiveStep("stage1")}
                next={() => setActiveStep("stage2")}
                schoolBookingDataInfo={schoolBookingDataInfo}
                 diverInfo={diverInfo}
                 onClose={()=>setIsOpenCardModal(false)}
              />
            )}
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSchoolPlan;