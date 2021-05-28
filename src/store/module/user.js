import { firestoreAction } from "vuexfire";
import { db } from "../../main";

// prevents naming conflicts with other modules
const namespaced = true;

// Default state management for all the varying fields
const state = 
{
  id: '',
  name: null,
  email: null,
  partnerId: null,
  movieApiPage: 1,
  Recommendation: []
};

// Modifications to each state similar to an event
const mutations = 
{
    User_Data: (state, payload) => 
    {
      state.id = payload.id;
      state.name = payload.name;
      state.email = payload.email;
      state.partnerId = payload.partnerId;
      state.movieApiPage = payload.movieApiPage;
    },
     Clear_Data: (state) =>
    {
      state.id = '';
      state.name = '';
      state.email = '';
      state.partnerId = '';
    },
    Partner_Data: (state, payload) => 
    {
      state.partnerId = payload;
    },
    SET_MOVIE_API_PAGE: (state, payload) =>
    {
      state.movieApiPage = payload;
    },  
}

// commits muutations intialized above.
const actions = 
{
    setuData(context, uData) 
    {
        context.commit('User_Data', uData);
    },
    clearuData(context)
    {
        context.commit('Clear_Data');
    },
    setPartnerId(context, id)
    {
      context.commit("Partner_Data", id);
    },
    setMovieApiPage(context, pageNo)
    {
      context.commit("SET_MOVIE_API_PAGE", pageNo);
    },
    bindRecommendationRef: firestoreAction((context) => {
      return context.bindFirestoreRef(
        "Recommendation",
        db
          .collection("users")
          .doc(context.state.id)
          .collection("Recommendation")
      );
    }),
};

export default 
{
    namespaced,
    state,
    mutations,
    actions,
};