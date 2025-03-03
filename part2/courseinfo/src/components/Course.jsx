import Content from "./Content";
import Header from "./Header";

const Course = ({ courses }) => {
  const heading = "Web Development Curriculum";

  return (
    <>
      <Header name={heading} />
      <main>
        {courses.map((course) => (
          <section key={course.id}>
            <h2>{course.name}</h2>
            <Content parts={course.parts} />
          </section>
        ))}
      </main>
    </>
  );
};

export default Course;
