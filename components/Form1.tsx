import { z } from "zod";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { useCallback, useEffect } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { cn } from "utils/cn";

const MemberSchema = z.object({
  memberId: z.number().int().positive(),
  name: z.string(),
  nickname: z.string(),
  isCovered: z.boolean(),
  isSubscriber: z.boolean(),
  insurance: z.string().nullable(),
  insuranceId: z.string().nullable(),
});

type Member = z.infer<typeof MemberSchema>;

const HouseholdSchema = z.object({
  members: z.array(MemberSchema),
});

type Household = z.infer<typeof HouseholdSchema>;

const defaultValues: Household = {
  members: [
    {
      memberId: 1,
      name: "Jerome Bell",
      nickname: "Rome",
      isCovered: true,
      isSubscriber: true,
      insurance: "primary",
      insuranceId: null,
    },
    {
      memberId: 2,
      name: "Stacy Bell",
      nickname: "Stacy",
      isCovered: true,
      isSubscriber: false,
      insurance: "primary",
      insuranceId: null,
    },
    {
      memberId: 3,
      name: "Rebecca Bell",
      nickname: "Becca",
      isCovered: false,
      isSubscriber: false,
      insurance: null,
      insuranceId: null,
    },
  ],
};

export default function Form1() {
  const { handleSubmit, control, register, watch, setValue } =
    useForm<Household>({
      defaultValues,
    });
  const { fields, append } = useFieldArray({
    control,
    name: "members",
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name?.endsWith(".isSubscriber")) {
        setValue(
          "members",
          value.members?.map(
            (member, index) =>
              ({
                ...member,
                isSubscriber: name === `members.${index}.isSubscriber`,
              } as Member)
          ) ?? []
        );
      }
    });
    return subscription.unsubscribe;
  }, [setValue, watch]);

  const onSubmit = useCallback<SubmitHandler<Household>>(async (data) => {
    alert(JSON.stringify(data, null, 2));
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="px-6 font-rubik text-neem-text w-full max-w-[684px] mx-auto">
        <h2 className="text-base font-medium tracking-[-0.32px] my-3">
          Household
        </h2>
        <div className="flex flex-col items-stretch gap-y-3">
          <div className="flex flex-row gap-x-4">
            <p className="text-xs tracking-[-0.24px] w-16">Covered</p>
            <p className="text-xs tracking-[-0.24px] grow">Name</p>
            <p className="text-xs tracking-[-0.24px] text-center w-16">
              Subscriber
            </p>
            <p className="text-xs tracking-[-0.24px] w-32">Insurance</p>
            <p className="text-xs tracking-[-0.24px] w-32">ID</p>
          </div>
          {fields.map((field, index) => {
            return (
              <div className="flex flex-row gap-x-4" key={field.id}>
                <label
                  htmlFor={`members.${index}.isCovered`}
                  className="w-16 flex items-center justify-center cursor-pointer accent-neem-primary focus-visible:outline-none self-center justify-self-center focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-neem-primary"
                >
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    id={`members.${index}.isCovered`}
                    {...register(`members.${index}.isCovered`)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="hidden peer-checked:block w-6 h-6 flex-shrink-0 fill-neem-primary stroke-neem-white"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path
                      d="M7.00311 12.22L10.3364 16L17.0031 9"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="peer-checked:hidden w-6 h-6 flex-shrink-0 stroke-neem-muted fill-none"
                  >
                    <rect
                      x="4"
                      y="4"
                      width="16"
                      height="16"
                      rx="1"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </label>
                <span className="grow flex items-center gap-x-2 text-sm tracking-[-0.28px]">
                  <UserCircleIcon
                    className={cn("w-6 h-6 flex-shrink-0", {
                      "fill-neem-violet": index === 0,
                      "fill-neem-blue": index === 1,
                      "fill-neem-orange": index === 2,
                    })}
                  />
                  <p className="flex-shrink-0">{field.name}</p>
                  <p className="text-neem-muted empty:hidden before:content-['('] after:content-[')']">
                    {field.nickname}
                  </p>
                </span>
                <label
                  htmlFor={`members.${index}.isSubscriber`}
                  className="w-16 flex items-center justify-center cursor-pointer accent-neem-primary focus-visible:outline-none self-center justify-self-center"
                >
                  <input
                    {...register(`members.${index}.isSubscriber`)}
                    type="radio"
                    id={`members.${index}.isSubscriber`}
                    className="sr-only peer"
                    checked={field.isSubscriber}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="hidden peer-checked:block w-6 h-6 flex-shrink-0"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="#70C4BB"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="12" r="6" fill="#70C4BB" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="peer-checked:hidden w-6 h-6 flex-shrink-0"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="#9DA7BE"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>
                </label>
                <select
                  {...register(`members.${index}.insurance`)}
                  className="w-32 rounded-md border border-neem-border bg-neem-white focus-visible:outline-none p-3 text-sm text-ellipsis whitespace-nowrap focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-neem-primary"
                >
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                </select>
                <input
                  type="text"
                  {...register(`members.${index}.insuranceId`)}
                  placeholder="Ins. ID/SSN"
                  className="w-32 rounded-md border border-neem-border bg-neem-white focus-visible:outline-none p-3 text-sm text-ellipsis whitespace-nowrap placeholder:text-neem-muted focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-neem-primary"
                />
              </div>
            );
          })}
          <button
            type="button"
            className="self-end text-neem-primary text-xs"
            onClick={() =>
              append({
                memberId: fields.length,
                name: "",
                nickname: "",
                isCovered: false,
                isSubscriber: false,
                insurance: null,
                insuranceId: null,
              })
            }
          >
            +Add new member
          </button>
        </div>
      </section>

      <button type="submit">Save</button>
    </form>
  );
}
