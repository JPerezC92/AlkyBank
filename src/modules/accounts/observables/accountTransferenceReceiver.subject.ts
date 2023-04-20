import { AccountTransferReceiver } from "@/accounts/domain";
import { SubjectManager } from "@/shared/utils";

export const accountTransferenceReceiver$ =
	new SubjectManager<AccountTransferReceiver | null>();
