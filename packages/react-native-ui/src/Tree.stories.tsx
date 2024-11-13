import { useState } from 'react';
import type { ComponentEntry, IndexHash } from '@storybook/core/manager-api';
import type { StoryObj, Meta } from '@storybook/react';
import { Tree } from './Tree';
import { index } from './mockdata.large';
import { DEFAULT_REF_ID } from './constants';
import { ScrollView, Text } from 'react-native';

const customViewports = {
  sized: {
    name: 'Sized',
    styles: {
      width: '380px',
      height: '90%',
    },
  },
};

const meta = {
  component: Tree,
  title: 'UI/Sidebar/Tree',
  excludeStories: /.*Data$/,
  parameters: {
    layout: 'fullscreen',
    theme: 'light',
    viewport: {
      defaultViewport: 'sized',
      viewports: customViewports,
    },
  },
  decorators: [
    (Story) => (
      <ScrollView>
        <Story />
      </ScrollView>
    ),
  ],
} as Meta<typeof Tree>;

export default meta;

const storyId = Object.values(index).find((story) => story.type === 'story').id;

type Story = StoryObj<typeof meta>;

export const Full: Story = {
  args: {
    docsMode: false,
    isBrowsing: true,
    isMain: true,
    refId: DEFAULT_REF_ID,
  },
  render: function Render(args) {
    const [selectedId, setSelectedId] = useState(storyId);
    return (
      <Tree {...args} data={index} selectedStoryId={selectedId} onSelectStoryId={setSelectedId} />
    );
  },
};
export const Dark: Story = {
  ...Full,
  parameters: { theme: 'dark' },
};

export const SingleStoryComponents: Story = {
  args: {
    docsMode: false,
    isBrowsing: true,
    isMain: true,
    refId: DEFAULT_REF_ID,
  },
  render: function Render(args) {
    const [selectedId, setSelectedId] = useState('tooltip-tooltipbuildlist--default');
    return (
      <Tree
        {...args}
        data={{
          ...{
            single: {
              tags: [],
              type: 'component',
              name: 'Single',
              id: 'single',
              parent: null,
              depth: 0,
              children: ['single--single'],
              renderLabel: () => <Text>🔥 Single</Text>,
            },
            'single--single': {
              type: 'story',
              id: 'single--single',
              title: 'Single',
              name: 'Single',
              tags: [],
              prepared: true,
              args: {},
              argTypes: {},
              initialArgs: {},
              depth: 1,
              parent: 'single',
              renderLabel: () => <Text>🔥 Single</Text>,
              importPath: './single.stories.js',
            },
          },
          ...Object.keys(index).reduce((acc, key) => {
            if (key === 'tooltip-tooltipselect--default') {
              acc['tooltip-tooltipselect--tooltipselect'] = {
                ...index[key],
                id: 'tooltip-tooltipselect--tooltipselect',
                name: 'TooltipSelect',
              };
              return acc;
            }
            if (key === 'tooltip-tooltipselect') {
              acc[key] = {
                ...(index[key] as ComponentEntry),
                children: ['tooltip-tooltipselect--tooltipselect'],
              };
              return acc;
            }
            if (key.startsWith('tooltip')) {
              acc[key] = index[key];
            }
            return acc;
          }, {} as IndexHash),
        }}
        selectedStoryId={selectedId}
        onSelectStoryId={setSelectedId}
      />
    );
  },
};
