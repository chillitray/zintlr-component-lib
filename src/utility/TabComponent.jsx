import React from 'react';
import { cn } from '../utility/cn';

/**
 * TabComponent is a reusable component that renders a list of tabs with buttons.
 *
 * tabList - An array of tab objects, each containing properties for a tab.
 *                          Each tab object should have the following properties:
 *                          - name: The display name of the tab (string).
 *                          - value: The value associated with the tab (string or any).
 *                          - icon: The icon to be displayed next to the tab name (React component).
 * activeTab - The value of the currently active tab (string or any).
 * setActiveTab - A function to set the active tab when a tab is clicked.
 *                                  It should accept a single parameter, which will be the new active tab value.
 * fixedTabWidth - A boolean indicating whether the tabs should have a fixed width (default: false).
 * className - An optional class name to be applied to the component (default: "").
 * titleClassName - An optional class name to be applied to the title of each tab (default: "").
 * - Additional button arguments that can be passed to the buttons
 * It returns- Returns the JSX representation of the TabComponent.
 */
function TabComponent({
  tabList,
  activeTab,
  setActiveTab,
  fixedTabWidth,
  className = '',
  titleClassName = '',
  containerClassName = '',
  ...args
}) {
  return (
    <div className={cn('flex', containerClassName)}>
      {tabList.map((tab, index) => {
        // Render a button for each tab in the tabList array
        return (
          <button
            key={index}
            type="button"
            onClick={() => setActiveTab(tab.value ?? tab.name)}
            className={cn(
              `${fixedTabWidth ? 'w-40' : ''}
							px-6 py-2 flex items-center justify-center gap-1 border-b-2 outline-0
							${(tab.value ?? tab.name) === activeTab ? 'border-iris text-iris  font-semibold' : 'border-white'}`,
              className
            )}
            {...args}
          >
            {/* Render the icon if provided */}
            {tab?.icon && (
              <span className="max-w-[10%] mr-1 text-center">
                {typeof tab.icon === 'function' ? (
                  // Render the icon component with optional iconClassName
                  <tab.icon className={tab.iconClassName || ''} />
                ) : (
                  tab.icon
                )}
              </span>
            )}
            <span
              className={cn(
                `px-2  font-medium text-base text-left ${tab?.icon ? 'max-w-fit' : ''} `,
                titleClassName
              )}
            >
              {tab.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default TabComponent;
