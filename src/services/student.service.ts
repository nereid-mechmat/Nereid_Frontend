import { Observable, ReplaySubject, tap } from 'rxjs';
import ApiService from '@/services/api.service';
import { UsersApi } from '@/types/api';

class StudentService extends ApiService {
  public readonly student$ = new ReplaySubject<UsersApi.Student.Get>(1);

  private readonly endpoints = {
    health: '/student/healthy',

    // Student endpoints
    getStudent: '/student/get',

    // Discipline endpoints
    getAllDisciplines: '/student/get-all-disciplines',
    getAllSelectedDisciplines: '/student/get-all-selected-disciplines',
    selectDiscipline: '/student/select-discipline', // :id
    deselectDiscipline: '/student/deselect-discipline', // :id
    getDiscipline: '/student/get-discipline', // :id
    getTeacher: '/student/get-teacher', // :id
  };

  // Student endpoints
  getStudent(): Observable<UsersApi.Student.Get> {
    return this.get<UsersApi.Student.Get>(this.endpoints.getStudent).pipe(
      tap(response => {
        this.student$.next(response);
      })
    );
  }

  // Discipline endpoints
  getAllDisciplines(semester: string): Observable<UsersApi.Student.GetAllDisciplinesResponse> {
    return this.get<UsersApi.Student.GetAllDisciplinesResponse>(this.endpoints.getAllDisciplines, {params: {semester}});
  }

  getAllSelectedDisciplines(semester: string): Observable<UsersApi.Student.GetAllSelectedDisciplinesResponse> {
    return this.get<UsersApi.Student.GetAllSelectedDisciplinesResponse>(this.endpoints.getAllSelectedDisciplines, {params: {semester}});
  }

  getDiscipline(id: number): Observable<UsersApi.Student.GetDisciplineResponse> {
    return this.get<UsersApi.Student.GetDisciplineResponse>(`${this.endpoints.getDiscipline}/${id}`);
  }

  getTeacher(id: number): Observable<UsersApi.Student.GetTeacherResponse> {
    return this.get<UsersApi.Student.GetTeacherResponse>(`${this.endpoints.getTeacher}/${id}`);
  }

  selectDisciplines(data: UsersApi.Student.SelectDisciplineRequest): Observable<UsersApi.Student.SelectDisciplineResponse> {
    return this.patch<UsersApi.Student.SelectDisciplineRequest, UsersApi.Student.SelectDisciplineResponse>(
      this.endpoints.selectDiscipline,
      data, {params: {semester: data.semester}}
    );
  }

  deselectDisciplines(data: UsersApi.Student.SelectDisciplineRequest): Observable<UsersApi.Student.DeselectDisciplineResponse> {
    return this.patch<UsersApi.Student.SelectDisciplineRequest, UsersApi.Student.SelectDisciplineResponse>(
      this.endpoints.deselectDiscipline,
      data, {params: {semester: data.semester}}
    );
  }
}

export default new StudentService();
