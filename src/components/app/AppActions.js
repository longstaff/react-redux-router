export const LOADING_SET = "concrete.test.loading";

export function setLoading(isLoading) {
	return {
		type: LOADING_SET,
		isLoading
	}
}