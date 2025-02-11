import { Meta, StoryObj } from "@storybook/react";
import { defineStepper } from "../../resources/js/Components/ui";
import { Button } from "../../resources/js/Components/ui";

// Define steps
const {
    StepperProvider,
    StepperControls,
    StepperNavigation,
    StepperPanel,
    StepperStep,
    StepperTitle,
  } = defineStepper(
  { id: "step-1", title: "Step 1" },
  { id: "step-2", title: "Step 2" },
  { id: "step-3", title: "Step 3" }
);

const meta: Meta<typeof StepperProvider> = {
    title: "shadcn/Stepper",    
    component: StepperProvider,    
    tags: ['autodocs'],
    argTypes: {
        variant: {
            options: ['horizontal', 'vertical', 'circle'],
            control: {type: 'radio'}
        },
        labelOrientation: {
            options: ['horizontal', 'vertical'],
            control: {type: 'radio'}
        },

    },
    args: {
        variant: 'horizontal',
        labelOrientation: 'horizontal',
        tracking: false,
    },
    render: (args) => (
        <StepperProvider className="space-y-4" {...args} >
        {({ methods }) => (
            <React.Fragment>
                <StepperNavigation>
                    {methods.all.map((step) => (
                    <StepperStep
                        key={step.id}
                        of={step.id}
                        onClick={() => methods.goTo(step.id)}
                    >
                        <StepperTitle>{step.title}</StepperTitle>
                    </StepperStep>
                    ))}
                </StepperNavigation>

                {methods.switch({
                    "step-1": (step) => <Content id={step.id} />,
                    "step-2": (step) => <Content id={step.id} />,
                    "step-3": (step) => <Content id={step.id} />,
                })}

                <StepperControls>
                    {!methods.isLast && (
                    <Button
                        variant="secondary"
                        onClick={methods.prev}
                        disabled={methods.isFirst}
                    >
                        Previous
                    </Button>
                    )}

                    <Button onClick={methods.isLast ? methods.reset : methods.next}>
                        {methods.isLast ? "Reset" : "Next"}
                    </Button>
                </StepperControls>
            </React.Fragment>
        )}
        </StepperProvider>
    ),
} satisfies Meta<typeof StepperProvider>;

const Content = ({ id }: { id: string }) => {
    return (
      <StepperPanel className="h-[200px] content-center rounded border bg-slate-50 p-8">
        <p className="text-xl font-normal">Content for {id}</p>
      </StepperPanel>
    )
}

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default form of the stepper.
 */
// @ts-ignore
export const Default: Story = {}
