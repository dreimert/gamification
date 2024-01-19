export class StudentGrade {
    sessionName: string;
    tp: string;
    level: number;
    grade: number;
    mean: number;
    std: number;
    coefficient: number;

    constructor(
        sessionName: string,
        tp: string,
        level: number,
        grade: number,
        mean: number,
        std: number,
        coefficient: number,
    ) {
        this.sessionName = sessionName;
        this.tp = tp;
        this.level = level;
        this.grade = grade;
        this.mean = mean;
        this.std = std;
        this.coefficient = coefficient;
    }
}

export class TeacherGrade {
    progressionId: string;
    studentName: string;
    level: number;
    grade: number;
    gradeOverriden: boolean;
    gradeComment: string;

    constructor(
        progressionId: string,
        studentName: string,
        level: number,
        grade: number,
        gradeOverriden: boolean,
        gradeComment: string,
    ) {
        this.progressionId = progressionId;
        this.studentName = studentName;
        this.level = level;
        this.grade = grade;
        this.gradeOverriden = gradeOverriden;
        this.gradeComment = gradeComment;
    }
}
