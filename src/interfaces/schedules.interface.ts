import { z } from "zod";
import {
  scheduleCreationSchema,
  scheduleResponseSchema,
} from "../schemas/schedules.schema";

type TScheduleCreation = z.infer<typeof scheduleCreationSchema>;
type TScheduleCreationResponse = z.infer<typeof scheduleResponseSchema>;

export { TScheduleCreationResponse, TScheduleCreation };
