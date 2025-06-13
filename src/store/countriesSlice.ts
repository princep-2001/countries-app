import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

interface Country {
  name: string;
  region: string;
  flag: string;
}

interface CountriesState {
  countries: Country[];
  filteredCountries: Country[];
  displayedCountries: Country[];
  selectedRegion: string;
  loading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
}

const initialState: CountriesState = {
  countries: [],
  filteredCountries: [],
  displayedCountries: [],
  selectedRegion: 'All',
  loading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 12,
};

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async () => {
    const response = await fetch(
      'https://restcountries.com/v3.1/all?fields=name,region,flags'
    );
    const data = await response.json();
    return data.map((country: any) => ({
      name: country.name.common,
      region: country.region,
      flag: country.flags.png,
    }));
  }
);

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setSelectedRegion: (state, action: PayloadAction<string>) => {
      state.selectedRegion = action.payload;
      state.currentPage = 1;

      if (action.payload === 'All') {
        state.filteredCountries = state.countries;
      } else {
        state.filteredCountries = state.countries.filter(
          country => country.region === action.payload
        );
      }

      state.displayedCountries = state.filteredCountries.slice(
        0,
        state.itemsPerPage
      );
    },
    loadMoreCountries: state => {
      state.currentPage += 1;
      const startIndex = state.currentPage * state.itemsPerPage;
      const endIndex = startIndex + state.itemsPerPage;
      const newCountries = state.filteredCountries.slice(startIndex, endIndex);
      state.displayedCountries = [...state.displayedCountries, ...newCountries];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCountries.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
        state.filteredCountries = action.payload;
        state.displayedCountries = action.payload.slice(0, state.itemsPerPage);
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch countries';
      });
  },
});

export const { setSelectedRegion, loadMoreCountries } = countriesSlice.actions;
export default countriesSlice.reducer;
