import streamlit as st
import pickle
from hybrid import hybrid_recommend

# ---------- PAGE CONFIG ----------
st.set_page_config(
    page_title="Hybrid Movie Recommendation System",
    page_icon="🎬",
    layout="wide"
)

# ---------- LOAD DATA ----------
movies = pickle.load(open("models/content_model.pkl", "rb"))

# ---------- HEADER ----------
st.markdown(
    """
    <h1 style='text-align: center;'>🎬 Hybrid Movie Recommendation System</h1>
    <p style='text-align: center; color: gray;'>
    Content-Based Filtering + Collaborative Filtering (SVD)
    </p>
    """,
    unsafe_allow_html=True
)

st.divider()

# ---------- INPUT SECTION ----------
st.subheader("🔎 Choose Your Preferences")

col1, col2 = st.columns(2)

with col1:
    user_id = st.number_input(
        "User ID (MovieLens)",
        min_value=1,
        max_value=943,
        step=1,
        help="Different user IDs produce personalized recommendations"
    )

with col2:
    movie = st.selectbox(
        "Movie you like",
        movies["title"].str.title().values
    )

st.markdown("<br>", unsafe_allow_html=True)

# ---------- ACTION ----------
if st.button("🎯 Recommend Movies", use_container_width=True):
    with st.spinner("Finding the best recommendations for you..."):
        recommendations = hybrid_recommend(user_id, movie)

    st.divider()
    st.subheader("🍿 Recommended for You")

    # ---------- RESULTS IN CARDS ----------
    cols = st.columns(5)

    for idx, rec in enumerate(recommendations):
        with cols[idx]:
            st.markdown(
                f"""
                <div style="
                    border: 1px solid #ddd;
                    border-radius: 10px;
                    padding: 12px;
                    height: 120px;
                    background-color: #111;
                    text-align: center;
                ">
                    <h4 style="color: #fff;">{rec}</h4>
                </div>
                """,
                unsafe_allow_html=True
            )

    # ---------- EXPLANATION ----------
    with st.expander("ℹ️ How were these movies recommended?"):
        st.markdown(
            """
            - **Content-Based Filtering** finds movies similar to your selected movie  
            - **Collaborative Filtering (SVD)** ranks them based on your User ID  
            - The final list is a **hybrid of similarity + personalization**
            """
        )

# ---------- FOOTER ----------
st.divider()
st.markdown(
    "<p style='text-align: center; color: gray;'>ML Project • Hybrid Recommendation System</p>",
    unsafe_allow_html=True
)
