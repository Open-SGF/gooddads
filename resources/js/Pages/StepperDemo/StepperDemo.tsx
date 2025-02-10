import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import { Step } from '@stepperize/react'
import {
    defineStepper,
    Stepper,
    StepperNavigation,
    StepperControls,
    StepperPanel,
    StepperStep,
    StepperTitle,
    StepperDescription,
    Button,
} from '@/Components/ui'

const steps: Step[] = [
    { id: "step-1", title: "Step 1", description: "This is the first step" },
    { id: "step-2", title: "Step 2", description: "This is the second step" },
    { id: "step-3", title: "Step 3", description: "This is the third step" },
    { id: "step-4", title: "Step 4", description: "This is the fourth step" },
];

const stepperInstance = defineStepper(...steps);


export default function StepperDemo({ auth }: PageProps) {
	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
					Stepper Demo
				</h2>
			}
		>
			<Head title="StepperDemo" />

			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
						<div className="p-6 text-gray-900 dark:text-gray-100">
                            <Stepper instance = { stepperInstance } className="space-y-4" variant="horizontal">
                                {({ methods }) => (                                    
                                    <React.Fragment>
                                        {/* <pre>{JSON.stringify(methods, null, 2)}</pre> */}
                                        <StepperNavigation>
                                            {methods.all.map((step) => (
                                            <StepperStep
                                                key={step.id}
                                                of={step}
                                                onClick={() => methods.goTo(step.id)}
                                            >
                                                <StepperTitle>{step.title}</StepperTitle>
                                                <StepperDescription>{step.description}</StepperDescription>
                                            </StepperStep>
                                            ))}
                                        </StepperNavigation>  
                                        <div className="flex items-center gap-2">
                                            {/* <span className="text-sm text-muted-foreground">
                                                Step {methods.current.id}
                                            </span> */}
                                            {/* <pre>{JSON.stringify(methods.current, null, 2)}</pre> */}
                                        </div>                                     

                                        {methods.switch({
                                            "step-1": (step) => <Content step = {step} />,
                                            "step-2": (step) => <Content step = {step} />,
                                            "step-3": (step) => <Content step = {step} />,
                                            "step-4": (step) => <Content step = {step} />,
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
                                            <Button variant="secondary" onClick={methods.isLast ? methods.reset : methods.next}>
                                            {methods.isLast ? "Reset" : "Next"}
                                            </Button>
                                        </StepperControls>
                                    </React.Fragment>
                                )}</Stepper>
						</div>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	)
}

// A simple content component that will be rendered for each step.
const Content = ({ step }: { step: Step }) => {
    return (
      <div> 
        {/* <div>This is the contentpanel for step {step.id}</div>
        <pre>{JSON.stringify(step, null, 2)}</pre> */}
        <StepperPanel when={ step } className="h-[200px] flex items-center justify-center rounded border bg-slate-50 p-8">
            <p className="text-xl font-normal">Content for {step.id}</p>
        </StepperPanel>
      </div>
    );
  };