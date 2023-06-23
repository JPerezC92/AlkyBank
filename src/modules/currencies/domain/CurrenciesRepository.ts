export interface CurrenciesRepository {
	findAll(signal?: AbortSignal): Promise<string[]>;
}
