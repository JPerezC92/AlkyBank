// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import us from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";

export const userEvent = us as unknown as UserEvent;
