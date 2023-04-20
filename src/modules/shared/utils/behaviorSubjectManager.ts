import { BehaviorSubject } from "rxjs";

export class SubjectManager<T> {
	private _subject: BehaviorSubject<T | null>;

	constructor() {
		this._subject = new BehaviorSubject<T | null>(null);
	}

	setSubject(value: T) {
		this._subject.next(value);
	}

	getSubject() {
		return this._subject.asObservable();
	}
}
