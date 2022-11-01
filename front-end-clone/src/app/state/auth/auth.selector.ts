import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/model/appState.interface';

export const selectFeature = (state: AppStateInterface) => state.login;

// export const isLoadingSelector = createSelector(selectFeature, (state) => state.ischeck)

export const tokenSelector = createSelector(
  selectFeature,
  (state) => state.token
);
export const errSelector = createSelector(
  selectFeature,
  (state) => state.errCode
);
export const mesSelector = createSelector(
  selectFeature,
  (state) => state.message
);
export const nameSelector = createSelector(
  selectFeature,
  (state) => state.name
);

export const isLoadingSelector = createSelector(
  selectFeature,
  (state) => state.ischeck
);

export const roleSelector = createSelector(
  selectFeature,
  (state) => state.role
);

export const coinSelector = createSelector(
  selectFeature,
  (state) => state.coin as number
);
