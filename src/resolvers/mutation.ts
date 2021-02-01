import { IResolvers } from 'graphql-tools';
import _ from 'lodash';
import { DATABASE } from '../data/data.store';

const mutation: IResolvers = {
  Mutation: {
    newCourse(__: void, { course }): any {
      const courseItem = {
        id: String(DATABASE.courses.length + 1),
        title: course.title,
        description: course.description,
        clases: course.clases,
        time: course.time,
        level: course.level,
        logo: course.logo,
        path: course.path,
        teacher: course.teacher,
        reviews: [],
      };

      if (
        DATABASE.courses.filter((item) => item.title === courseItem.title)
          .length === 0
      ) {
        DATABASE.courses.push(courseItem);
        return courseItem;
      }

      return {
        id: -1,
        title: 'Course exists.',
        description: '',
        clases: -1,
        time: 0.0,
        level: '',
        logo: '',
        path: '',
        teacher: '',
        reviews: [],
      };
    },
    modifyCourse(__: void, { course }): any {
      const existCourse = _.findIndex(DATABASE.courses, (o) => {
        return o.id === course.id;
      });

      if (existCourse > -1) {
        const reviews = DATABASE.courses[existCourse].reviews;
        course.reviews = reviews;
        DATABASE.courses[existCourse] = course;
        return course;
      }

      return {
        id: -1,
        title: 'Course doesnt exists.',
        description: '',
        clases: -1,
        time: 0.0,
        level: '',
        logo: '',
        path: '',
        teacher: '',
        reviews: [],
      };
    },
    deleteCourse(__: void, { id }): any {
      const deleteCourse = _.remove(DATABASE.courses, (course) => {
        return course.id === id;
      });
      if (deleteCourse[0] === undefined) {
        return {
          id: -1,
          title: 'Course doesnt exists.',
          description: '',
          clases: -1,
          time: 0.0,
          level: '',
          logo: '',
          path: '',
          teacher: '',
          reviews: [],
        };
      }
      return deleteCourse[0];
    },
  },
};

export default mutation;
