export const formSerializer = ({
  referenceType,
  referenceName,
  referenceSurname,
  referencePhone,
  referenceCompany,
  referenceRole,
  languageName,
  spokenLevel,
  readLevel,
  writtenLevel,
  role,
  company,
  workField,
  positionLevel,
  peopleInCharge,
  task,
  salary,
  startWorkDate,
  currentlyWorking,
  endWorkDate,
  skills,
  level,
  title,
  institute,
  fieldOfStudy,
  startStudyDate,
  currentlyStudying,
  endStudyDate,
  city,
  county,
  studies = [],
  references = [],
  languages = [],
  workExperiences = [],
  ...rest
}) => {
  if (referenceName && referenceSurname && referencePhone) {
    references.push({
      referenceType,
      referenceName,
      referenceSurname,
      referencePhone,
      referenceCompany,
      referenceRole,
    });
  }
  if (languageName) {
    languages.push({
      languageName,
      spokenLevel,
      readLevel,
      writtenLevel,
    });
  }
  if (company) {
    workExperiences.push({
      role,
      company,
      workField,
      positionLevel,
      peopleInCharge,
      task,
      salary,
      startWorkDate,
      currentlyWorking,
      endWorkDate,
      skills,
    });
  }
  if (title) {
    studies.push({
      level,
      title,
      institute,
      fieldOfStudy,
      startStudyDate,
      currentlyStudying,
      endStudyDate,
      county,
      city,
    });
  }
  return { ...rest, references, studies, workExperiences, languages };
};