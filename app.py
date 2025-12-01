import streamlit as st
import re

# --------- HELPER FUNCTIONS ---------
def clean_text(text: str) -> str:
    return text.lower()

def extract_keywords(text: str):
    text = clean_text(text)
    # Keep only words
    words = re.findall(r"[a-zA-Z]+", text)
    # Basic stopwords (you can expand this list)
    stopwords = {
        "and", "or", "the", "a", "an", "to", "of", "in", "on", "for", "with",
        "is", "are", "as", "at", "by", "this", "that", "from"
    }
    keywords = [w for w in words if w not in stopwords and len(w) > 2]
    return set(keywords)

def calculate_match(resume_text: str, job_text: str):
    resume_keywords = extract_keywords(resume_text)
    job_keywords = extract_keywords(job_text)

    if not job_keywords:
        return 0, [], resume_keywords, job_keywords

    matched = resume_keywords.intersection(job_keywords)
    missing = job_keywords.difference(resume_keywords)
    score = round(len(matched) / len(job_keywords) * 100, 2)
    return score, sorted(matched), sorted(missing), resume_keywords, job_keywords

# --------- STREAMLIT UI ---------
st.set_page_config(
    page_title="ATS Genie - Resume Match Checker",
    layout="wide"
)

st.title("🧞 ATS Genie – Smart Resume Match Checker")
st.write(
    "Paste your **resume** and the **job description**, and I'll estimate how well they match "
    "based on keyword overlap (simulating a basic ATS)."
)

col1, col2 = st.columns(2)

with col1:
    st.subheader("📄 Your Resume Text")
    resume_text = st.text_area(
        "Paste the *text* of your resume here (you can copy from PDF/Word).",
        height=300,
        placeholder="Example: Experienced software developer with skills in Python, data analysis..."
    )

with col2:
    st.subheader("💼 Job Description")
    job_text = st.text_area(
        "Paste the *job description* here.",
        height=300,
        placeholder="Example: We are looking for a Python developer with experience in APIs, SQL, and machine learning..."
    )

if st.button("✨ Analyze Match"):
    if not resume_text.strip() or not job_text.strip():
        st.error("Please paste **both** resume and job description to analyze.")
    else:
        score, matched, missing, resume_kw, job_kw = calculate_match(resume_text, job_text)

        st.markdown("---")
        st.subheader("📊 ATS Match Result")

        # Main score
        st.metric(label="Overall Match Score", value=f"{score} / 100")

        # Progress-like explanation
        if score >= 80:
            st.success("🔥 Amazing! Your resume is highly aligned with this job.")
        elif score >= 60:
            st.info("👍 Good match. With a few tweaks, this can be great.")
        elif score >= 40:
            st.warning("😐 Average match. You should customize your resume more.")
        else:
            st.error("⚠️ Low match. You need to tailor your resume significantly.")

        col3, col4 = st.columns(2)

        with col3:
            st.markdown("### ✅ Matched Keywords")
            if matched:
                st.write(", ".join(matched))
            else:
                st.write("No strong keyword matches found. Try adding more relevant terms.")

        with col4:
            st.markdown("### ❌ Missing Important Keywords")
            if missing:
                st.write(", ".join(missing))
            else:
                st.write("Great! You seem to cover most of the keywords from the job description.")

        # Tips
        st.markdown("---")
        st.subheader("💡 Suggestions to Improve")

        st.write("- Use the **missing keywords** naturally in your resume, in your experience and skills sections.")
        st.write("- Make sure your top skills appear in your **summary**, **skills**, and **recent roles**.")
        st.write("- Mirror the **language/style** of the job description (but don’t lie).")
        st.write("- Customize your resume for **each job** instead of using one generic version.")

        with st.expander("🔍 Debug / Extra Info (for nerds & recruiters)"):
            st.write("**Total Resume Keywords:**", len(resume_kw))
            st.write("**Total Job Description Keywords:**", len(job_kw))
            st.write("**All Resume Keywords:**", ", ".join(sorted(resume_kw)))
            st.write("**All Job Description Keywords:**", ", ".join(sorted(job_kw)))
else:
    st.caption("👆 Paste your text above and click **Analyze Match** to get started.")
