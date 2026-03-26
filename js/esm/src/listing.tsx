import { useState, useEffect } from 'react';

import { getString } from '@moodle/lms/core/str';
import Ajax from '@moodle/lms/core/ajax';

function searchCourses(query: string) {
    const request = {
        methodname: 'core_course_search_courses',
        args: {
            criterianame: 'search',
            criteriavalue: query
        }
    };

    return Ajax.call([request]).then(([result]) => result);
}

export default function CourseQuickSearch() {
    const [query, setQuery] = useState<string>('');
    const [courses, setCourses] = useState<any[]>([]);
    const [searchstring, setSearchstring] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        getString('searchcourses', 'local_reactdemo')
        .then(setSearchstring)
        .catch(console.error);
    }, []);

    const search = async (value: string) => {
        setQuery(value);

        if (!value) {
            setCourses([]);
            return;
        }

        setLoading(true);

        try {
            const result = await searchCourses(value);
            setCourses(result.courses || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card p-3">
            <h5>Course Quick Search</h5>

            <input
                className="form-control"
                placeholder={searchstring}
                value={query}
                onChange={(e) => search(e.target.value)}
            />
            {loading && <p className="mt-2">Searching...</p>}

            <ul className="mt-2">
                {courses.map(course => (
                    <li key={course.id}>{course.fullname}</li>
                ))}
            </ul>
        </div>
    );
}
