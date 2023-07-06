package com.codestates.tag.entity;

import com.codestates.reviewBoard.entity.ReviewBoardTag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tagId;
    private String tagName;

    public Tag(String tagName) {
        this.tagName = tagName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Tag tag = (Tag) o;
        return Objects.equals(tagName, tag.tagName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(tagName);
    }

    @OneToMany(mappedBy = "tag", cascade = CascadeType.ALL)
    private List<ReviewBoardTag> reviewBoardTags = new ArrayList<>();
}

//
//    @OneToMany(mappedBy = "tag", cascade = CascadeType.ALL)
//    private UserTag userTag;

