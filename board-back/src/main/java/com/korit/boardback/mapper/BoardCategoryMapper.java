package com.korit.boardback.mapper;

import com.korit.boardback.entity.BoardCategory;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardCategoryMapper {
    int insertBoardCategory(BoardCategory boardCategory);
    BoardCategory selectBoardCategoryByName(String boardCategoryName);

}
