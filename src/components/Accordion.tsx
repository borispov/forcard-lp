import { useState , useRef} from 'preact/hooks';

interface AccordionProps {
	title: string;
	children: string;
  }
  
  export default function Accordion ({ title, children }: AccordionProps) {
  
	const [active, setActive] = useState(false);
	const [height, setHeight] = useState('0px');
	// TODO: Add a Chevron icon and use Rotate className
	const contentSpace = useRef<HTMLDivElement>(null);
  
	function toggleAccordion() {
	  setActive((prevState) => !prevState)
	  if (contentSpace == undefined || contentSpace.current == undefined) {
		return;
	  }
	  setHeight( active ? '0px' : `${contentSpace.current?.scrollHeight * 2}px`);
	}
  
	return (
	  <div 
		onClick={toggleAccordion}
		class="accordion">
		  <p class="accordion-title">{title}</p>
		<p 
		  ref={contentSpace}
		//   style={{ maxHeight: `${height}`}}
		  class={`${active && 'active'} content active`}
		>{children}</p>
	  </div>
	)
  }