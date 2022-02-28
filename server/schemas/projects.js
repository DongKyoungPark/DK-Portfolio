export default {
  name: 'projects',
  title: 'Projects',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'period',
      title: 'Period',
      type: 'string',
    },
    {
      name: 'devPerson',
      title: 'Dev Person',
      type: 'string',
    },
    {
      name: 'projectLink',
      title: 'Project Link',
      type: 'string',
    },
    {
      name: 'projectVideo',
      title: 'Project Video',
      type: 'array',
      of: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
        },
      ],
    },
    {
      name: 'codeLink',
      title: 'Code Link',
      type: 'string',
    },
    {
      name: 'projectImage',
      title: 'Project Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        {
          name: 'tag',
          title: 'Tag',
          type: 'string',
        },
      ],
    },
    {
      name: 'review',
      title: 'Review',
      type: 'string',
    },
    {
      name: 'ps',
      title: 'PS',
      type: 'string',
    },
  ],
};
