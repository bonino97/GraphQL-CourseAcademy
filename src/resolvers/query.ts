import { DATABASE } from './../data/data.store';
import { IResolvers } from 'graphql-tools';

const query: IResolvers = {
  Query: {
    students(): any {
      return DATABASE.students;
    },
    student(__: void, { id }): any {
      const result = DATABASE.students.filter(
        (student) => student.id === id
      )[0];
      if (result === undefined) {
        return {
          id: '-1',
          name: `Student with id: ${id}, not found.`,
          email: '',
          courses: [],
        };
      }
      return result;
    },
    courses(): any {
      return DATABASE.courses;
    },
    course(__: void, { id }): any {
      const result = DATABASE.courses.filter((course) => course.id === id)[0];
      if (result === undefined) {
        return {
          id: '-1',
          title: `Course with id: ${id}, not found.`,
          description: '',
          clases: -1,
          time: 0.0,
          level: 'ALL',
          logo: '',
          path: '',
          teacher: '',
          reviews: [],
        };
      }
      return result;
    },
  },
};

export default query;
