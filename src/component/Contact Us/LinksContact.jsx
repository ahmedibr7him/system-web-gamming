import { useSelector } from "react-redux";

const LinksContact = () => {
  const { data } = useSelector((state) => state.linkContact || { data: [] });

  return (
    <>
      {data?.map((item) => (
        <li key={item.id} className="list-none">
          {item.link ? (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit our ${item.icone.split('-')[1] || 'social media'} page`}
              className="inline-block group"
            >
              <i
                className={`fa-brands ${item.icone} text-2xl text-white/90 
                hover:text-white transition-all duration-300 transform 
                group-hover:scale-125 group-hover:-translate-y-1`}
              ></i>
            </a>
          ) : (
            <i className={`fa-brands ${item.icone} text-2xl text-white/30 cursor-not-allowed`}></i>
          )}
        </li>
      ))}
    </>
  );
};

export default LinksContact;