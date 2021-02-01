import { DATABASE } from './../data/data.store';
import { IResolvers } from 'graphql-tools';
import _ from 'lodash';

const type: IResolvers = {
  Student: {
    courses: (parent) => {
      const coursesList: Array<any> = [];
      parent.courses.map((course: string) => {
        coursesList.push(_.filter(DATABASE.courses, ['id', course])[0]);
      });
      return coursesList;
    },
  },
  Course: {
    students: (parent) => {
      const studentsList: Array<any> = [];
      const courseId = parent.id;
      DATABASE.students.map((student: any) => {
        if (student.courses.filter((id: any) => id === courseId) > 0)
          studentsList.push(student);
      });
      return studentsList;
    },
    path: ({ path }) => `https://www.udemy.com${path}`,
  },
};

export default type;
