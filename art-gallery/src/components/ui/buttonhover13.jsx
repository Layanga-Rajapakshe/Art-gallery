import { ChevronsRight } from 'lucide-react';
const ButtonHover13 = () => {
  return (
    <>
      <a
        className="flex  gap-2 cursor-pointer px-2 py-3 hover:bg-black hover:text-white transition-all border-2 border-white bg-white text-black rounded-full font-semibold"
        href="#">
        Know More
        <ChevronsRight />
      </a>
    </>
  );
};
export default ButtonHover13;
