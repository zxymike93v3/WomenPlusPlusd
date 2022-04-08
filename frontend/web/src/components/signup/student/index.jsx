import React, { useEffect } from "react";
import axios from "../../../shared/axios";
import { Link } from "react-router-dom";
import './student.scss'


function Student(props) {
    const [location, setLocation] = React.useState("");
    const [course, setCourse] = React.useState("");
    const [language, setLanguage] = React.useState("");

    const [courseLocations, setCourseLocations] = React.useState([]);
    const [courses, setCourses] = React.useState([]);
    const [languages, setLanguages] = React.useState([]);

    const [setupStep, setSetupStep] = React.useState('location');

    useEffect(() => {
        axios.get('course-locations').then((response) => {
            setCourseLocations(response.data);
        });
        axios.get('courses').then((response) => {
            setCourses(response.data);
        });
        axios.get('supported-languages').then((response) => {
            setLanguages(response.data);
        });
    }, []);

    const createAccount = () => {
        if (setupStep === 'location') {
            setSetupStep('course');
        } else if (setupStep === 'course') {
            setSetupStep('language');
        } else {
            props.onSubmitData({
                location,
                course,
                language
            });
        }
    };

    return (
        <div className="col-lg-6">
            <h1>{props.title}</h1>
            <form>
                {setupStep === 'location' && (
                <div className="mb-5">
                    <label htmlFor="location" className="form-label">
                        Location
                    </label>
                    <select
                        id="location"
                        className="form-select"
                        onChange={(event) => {
                            setLocation(event.target.value);
                        }}
                        defaultValue={location || 0}
                    >
                        <option value={0} disabled>
                            Select your location
                        </option>
                        {courseLocations.map(({ id, location }) => (
                            <option key={id} value={location}>
                                {location}
                            </option>
                        ))}
                    </select>
                </div>
                )}
                {setupStep === 'course' && (
                    <div className="mb-5">
                        <label htmlFor="course" className="form-label">
                            My course
                        </label>
                        <select
                            id="course"
                            className="form-select"
                            onChange={(event) => {
                                setCourse(event.target.value);
                            }}
                            defaultValue={course || 0}
                        >
                            <option value={0} disabled>
                                Select your course
                            </option>
                            {courses.map(({ id, name }, index) => (
                                <option key={id} value={name}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                {setupStep === 'language' && (
                    <div className="mb-5">
                        <label htmlFor="language" className="form-label">
                            Language
                        </label>
                        <select
                            id="language"
                            className="form-select"
                            onChange={(event) => {
                                setLanguage(event.target.value);
                            }}
                            defaultValue={language || 0}
                        >
                            <option value={0} disabled>
                                Select language
                            </option>
                            {languages.map(({ id, language }, index) => (
                                <option key={id} value={language}>
                                    {language}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <div className="mb-5">
                    <button
                        type="button"
                        className="btn btn-primary w-100"
                        onClick={createAccount}
                        disabled={!(setupStep === 'location' && location !== '' || setupStep === 'course' && course || setupStep === 'language' && language)}
                    >
                        Create my account
                    </button>
                </div>
                <div className="text-center pb-5">
                    <Link to="/login" className="form-text">
                        Cancel account creation
                    </Link>
                </div>
            </form>
            <div className="singup-progress-bar my-5">
                <span className={`signup-progress-bar-number ${location !== '' ? 'active' : ''}`}>1</span>
                <span className={`signup-progress-bar-label ${location !== '' ? 'active' : ''}`} onClick={() => {setSetupStep('location')}}>
                    Location
                </span>
                <span className={`signup-progress-bar-line ${course !== '' ? 'active' : ''}`}></span>
                <span className={`signup-progress-bar-number ${course !== '' ? 'active' : ''}`}>2</span>
                <span className={`signup-progress-bar-label ${course !== '' ? 'active' : ''}`} onClick={() => {setSetupStep('course')}}>
                    Course(s)
                </span>
                <span className={`signup-progress-bar-line ${language !== '' ? 'active' : ''}`}></span>
                <span className={`signup-progress-bar-number ${language !== '' ? 'active' : ''}`}>3</span>
                <span className={`signup-progress-bar-label ${language !== '' ? 'active' : ''}`} onClick={() => {setSetupStep('language')}}>
                    Language
                </span>
            </div>
        </div>
    );
}

export default Student;