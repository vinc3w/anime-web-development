import { useRef } from "react";

function Footer() {

  const form = useRef(null);
  const subject = useRef(null);
  const body = useRef(null);
  const container = useRef(null);

  const focusSubject = e => subject.current.focus();
  const focusBody = e => body.current.focus();

  const wiggleForm = () => {
    form.current.classList.add("wiggle");
    setTimeout(() => form.current.classList.remove("wiggle"), 500)
  }

  const handleInputFocus = e => {
    const parent = e.target.parentElement;
    parent.classList.add("focus");

    e.target.onblur = () => {
      if (e.target.value.trim()) return;
      parent.classList.remove("focus");
    }
  }

  const handleFormSubmit = e => {
    e.preventDefault();
    const s = subject.current.value.trim();
    const b = body.current.value.trim();
    if (!s || !b) return;
    window.open(`mailto:vinc3w59@gmail.com?subject=${s}&body=${b}`); 
  }

  const showForm = () => {
    container.current.style.display = "grid";
    setTimeout(() => container.current.style.opacity = "1")
  }

  const cancel = () => {
    subject.current.value = "";
    body.current.value = "";
    container.current.style.opacity = "0";
    setTimeout(() => container.current.style.display = "", 200)
  }

  return (
    <footer>
      <div className="top">
        <p>
          Have some feature you want to add or a bug to report?
          Click <button onClick={showForm}>Here</button> to tell me
        </p>
        <div className="form-container" onClick={wiggleForm} ref={container}>
          <form ref={form} onSubmit={handleFormSubmit} onClick={e => e.stopPropagation()}>
            <section className="input-section" onClick={focusSubject}>
              <span className="label">Subject</span>
              <input type="text" required onFocus={handleInputFocus} ref={subject} />
            </section>
            <section className="textarea-section" onClick={focusBody}>
              <span className="label">Body</span>
              <textarea required onFocus={handleInputFocus} ref={body} ></textarea>
            </section>
            <div className="btns">
              <button type="button" onClick={cancel}>Cancel</button>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
        <ul className="bottom">
          <li><a target="_blank" rel="noreferrer" href="https://myanimelist.net">Source</a></li>
          <li><span></span></li>
          <li><a target="_blank" rel="noreferrer" href="https://jkan.io">Api</a></li>
          <li><span></span></li>
          <li><a target="_blank" rel="noreferrer" href="https://www.instagram.com/vinc3w_78220/">Follow Me</a></li>
          <li><span></span></li>
          <li><a target="_blank" rel="noreferrer" href="https://web.facebook.com/vincent.har.792">Friend Me</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;