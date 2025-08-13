import { Box } from '@mui/material'
import MangaHeader from '../../components/user/mangaList/MangaHeader'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import MangaCards from '../../components/user/mangaList/MangaCards';
import { api } from '../../services/api';
import usePaginatedMangaList from '../../hooks/usePaginatedMangaList';

function MangaList() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams()
  const statusKey = (searchParams.get("status")?.toLowerCase() || localStorage.getItem("status")?.toLowerCase() || "ongoing");
  const genreKey = (searchParams.get("genre")?.toLowerCase() || localStorage.getItem("genre")?.toLowerCase() || "all")
  const sortKey = (searchParams.get("sort")?.toLowerCase() || localStorage.getItem("sort")?.toLowerCase() || "az");
  const statusOptions = ["ongoing", "completed", "one shot"];
  const genreOptions = ["all", "action", "adventure", "fantasy", "supernatural"]
  const sortOptions = {
    az: "A to Z",
    za: "Z to A",
    popularityscore: "Popularity Score",
  };
  const [selectedStatus, setSelectedStatus] = useState(statusKey);
  const [selectedGenre, setSelectedGenre] = useState(genreKey);
  const [selectedSort, setSelectedSort] = useState({ key: sortKey, value: sortOptions[sortKey] });
  
  useEffect(() => {
    const fetchMangaList = async () => {
      if (!genreOptions.includes(genreKey) || !statusOptions.includes(statusKey) || !sortOptions[sortKey]) {
        navigate('/not-found')
      }
      const params = {
        status: selectedStatus,
        genre: selectedGenre,
        sort: selectedSort.key,
      }
      setSearchParams(params)
    };
    fetchMangaList();
  }, [selectedGenre, selectedSort, selectedStatus, searchParams])

  useEffect(() => {//delete the local storage when close the tab
    const handleTabClose = () => {
      localStorage.removeItem("status");
      localStorage.removeItem("genre");
      localStorage.removeItem("sort");
    };
    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);
  return (
    <>
    
      <Box
        component={'div'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mb: 2
        }}
      >
        <MangaHeader
          selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} statusOptions={statusOptions}
          selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} genreOptions={genreOptions}
          selectedSort={selectedSort} setSelectedSort={setSelectedSort} sortOptions={sortOptions}
        />
        <MangaCards status={selectedStatus} genre={selectedGenre} sort={selectedSort} />

      </Box>
    </>
  )
}

export default MangaList


/*
✅ الفرق بين useParams() و useSearchParams()
🔷 useParams():
تُستخدم لما يكون الباراميتر جزء من مسار الرابط (Path)
/mangalist/ongoing
Here, ongoing is a path parameter, typically handled as :status.

Key Points:الخصائص

Best for essential route parameters (like IDs, slugs, or main page types).

Cleaner and more readable URLs.

SEO-friendly (search engines index it well).

When the parameter changes, the entire route/component re-renders.(rerender for page)

You must define a dynamic route in your router:
<Route path="/mangalist/:status" element={<MangaList />} />


🔷 useSearchParams()
Used for query parameters(search parameter) after the ? in the URL, like:
/mangalist?status=ongoing&sort=az&genre=drama

Key Points:

Ideal for filters, sorting, and additional optional parameters.

You can apply multiple filters at once (status, sort, genre, etc.).

Easier to manage programmatically with setSearchParams.

Changing search params won’t reload the entire page, just updates the state/view.

Your Conclusion Is Spot-On:
🟨 ongoing, completed, one-shot are filters, not core parts of the page path.
🔁 So it's better to use useSearchParams instead of useParams for them.
*/