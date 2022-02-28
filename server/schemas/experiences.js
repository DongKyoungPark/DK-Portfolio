export default {
  name: 'experiences',
  title: 'Experiences',
  type: 'document',
  fields: [
    {
      name: 'year',
      title: 'Year',
      type: 'string',
    },
    {
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [{ type: 'workExperience' }],
    },
  ],
};
