import { MovementFilterTypeEnum } from "@/movements/domain";

export interface IMovementCriteria {
	accountId: string;
	operationType: MovementFilterTypeEnum;
	concept?: string;
}

export class MovementFilter implements IMovementCriteria {
	accountId: string;
	operationType: MovementFilterTypeEnum;
	concept?: string;

	constructor(props: IMovementCriteria) {
		this.accountId = props.accountId;
		this.operationType = props.operationType;
		this.concept = props.concept;
	}

	static default(accountId?: IMovementCriteria["accountId"]): MovementFilter {
		return new MovementFilter({
			accountId: accountId || "",
			operationType: MovementFilterTypeEnum.values.ALL,
		});
	}

	changeAccountId(accountId: IMovementCriteria["accountId"]): MovementFilter {
		return new MovementFilter({ ...this, accountId });
	}

	changeOperationType(
		operationType: IMovementCriteria["operationType"]
	): MovementFilter {
		return new MovementFilter({ ...this, operationType });
	}

	changeConcept(concept: IMovementCriteria["concept"]): MovementFilter {
		return new MovementFilter({ ...this, concept });
	}

	changeValues(values: Partial<IMovementCriteria>): MovementFilter {
		return new MovementFilter({ ...this, ...values });
	}
}
