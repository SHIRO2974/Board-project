package com.korit.boardback.service;

import com.korit.boardback.dto.ReqWriteBoardDto;
import com.korit.boardback.entity.Board;
import com.korit.boardback.entity.BoardCategory;
import com.korit.boardback.entity.User;
import com.korit.boardback.mapper.BoardCategoryMapper;
import com.korit.boardback.repository.BoardCategoryRepository;
import com.korit.boardback.repository.BoardRepository;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BoardService {

    @Autowired
    private BoardCategoryRepository boardCategoryRepository;

    @Autowired
    private BoardRepository boardRepository;

    @Transactional(rollbackFor = Exception.class)
    public Board createBoard(String categoryName, User user, ReqWriteBoardDto reqWriteBoardDto) {

        BoardCategory boardCategory = boardCategoryRepository.
                findByName(categoryName).orElseGet(() -> {
                    BoardCategory bc = BoardCategory.builder()
                            .boardCategoryName(categoryName)
                            .build();
                    return boardCategoryRepository.save(bc);
                });

        Board board = Board.builder()
                .boardCategoryId(boardCategory.getBoardCategoryId())
                .userId(user.getUserId())
                .title(reqWriteBoardDto.getTitle())
                .content(reqWriteBoardDto.getContent())
                .build();
        return boardRepository.save(board);
    }
}
